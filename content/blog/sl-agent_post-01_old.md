---
title: "The 62-Cent Agent: Friction, Not Compute, Is What a Personal AI Project Actually Costs"
date: "2026-09-27" # Publication date (YYYY-MM-DD)
summary: "A full cloud run of a personal AI agent cost under 62 cents — and only 17 of them were compute. Why friction, fragility, and setup, not price, are the real cost of building small agents on local and rented GPUs."
tags: ["Agentic AI", "Local LLMs", "Cloud GPUs", "MLOps"] # Category/Topic filter pills
coverImage: "/img/projects/sl-agent-62-cent-agent.png" # Widescreen cover image path
author: "Chamila Dharmawardhana, Ph.D."
---

# The 62-Cent Agent: Friction, Not Compute, Is What a Personal AI Project Actually Costs

*A full cloud run of my agent cost under 62 cents. The GPU compute inside it was $0.165. Everything else — setup, fumbling, a leaked key, price drift, idle time — was the other ~70%. On a personal agentic project in 2026, the money was never the constraint. The friction was.*

---

I'm a data scientist. I'm comfortable in the modeling half of this work and a self-described novice in the software-engineering half — the SSH tunnels, the config files, the phrase "just spin up a box." I set out to build the smallest useful agentic system I could think of, entirely on hardware I already owned, and to watch exactly where it broke and what that cost.

The test case was a trip planner: a small agent that reads public travel blogs and pulls out concrete amenities — cribs, heaters, road conditions — for a family trip abroad. But this isn't a post about trip planners. The trip planner is just the smallest honest excuse to build an agent and see where the walls are.

The stack was deliberately boring and free: Python 3.12, LangGraph and LangChain for orchestration, SQLite (WAL mode) for storage, Trafilatura to pull prose out of HTML, and Ollama running local models on a Dell G7 7588 — Intel i9, 32 GB RAM, and the one constraint that governs everything below: a GTX 1060 with **6 GB of VRAM** (about 5 usable).

## The smoke tests lied: 1.6 seconds was one sentence, not a web page

**The early speed was an illusion created by a toy-sized prompt.**

The first milestones passed instantly. Config validated, the database initialized, and warm single-sentence smoke tests came back fast — `llama3.1:8b` in about 1.6 seconds, `qwen3` in about 1.9. For an afternoon, fully private, zero-cost, local agentic AI felt like it was just sitting there working.

It wasn't. That 1.6-second figure was a *single sentence* — the smallest possible prompt. It says almost nothing about what happens when you hand the same model a real web page. So the first honest thing I learned is to distrust any smoke test that isn't the size of the real job.

## On a 6 GB card, an 8B model spills to system RAM and pages take minutes, not seconds

**Real 12,000-character pages don't fit in 6 GB, so part of the model runs off a slow bus and time balloons.**

An 8B model at a usable context window doesn't fit in 6 GB of VRAM. When I profiled placement, `llama3.1:8b` ran at roughly **83% on the GPU with 17% spilled into system RAM**. That 17% matters more than it sounds: every token that touches the spilled weights or the KV cache (the model's running memory of the prompt) has to cross the PCIe bus into ordinary system memory and back — orders of magnitude slower than staying on the card. (`phi4` was worse, spilling 55% to CPU, so I demoted it to a tiebreaker.)

One trap cost me real time here. Ollama's default context window silently drops any input past its limit[^1] — so an oversized page gets quietly truncated and your timing numbers become fiction. The fix was to stop trusting the default and set the context size (`num_ctx`) explicitly: 8,192 tokens on the laptop, 16,384 on the rented card.

With that fixed, the full run — 8 pages, `llama3.1:8b`, the stricter `extract_v3` prompt — took **4,709.64 seconds**, about 78.5 minutes, or 589 seconds per page.

The same model on a rented RTX 4090 finished a run in **534.80 seconds**. Read naively that's an 8.8× gap, but I won't hand you that number as a clean benchmark, because the two runs weren't the same job. The laptop ran `extract_v3` at 8,192 tokens; the cloud run was the earlier `extract_v2` at 16,384. Those differences push in *opposite* directions — the newer prompt generated more output (154 observations vs 140), which adds time on the laptop, while the smaller context window removes input-processing time. I can't tell you which way the bias nets out, so 8.8× isn't a hardware ratio. What survives is the qualitative finding: the laptop lives in *minutes per page*, the cloud in *seconds*, and that regime change is real regardless of the confounds.

![Figure 1: VRAM Placement Mechanism — 6 GB GTX 1060 vs. 24 GB RTX 4090](/img/projects/sl-agent-vram-placement-mechanism.png)

## Renting is cheap; the setup around it is where the evening goes

**The GPU rental itself was trivial. The friction wrapped around it was not.**

My first stop was RunPod, aiming for a Community Cloud 4090 at around $0.34/hr[^2]. It wasn't available: new Community host onboarding had reportedly closed earlier in 2026[^3], leaving only Secure Cloud at roughly $0.74/hr[^4].

The pricing isn't the part that stuck with me. While setting up RunPod tooling, an autonomous coding agent printed my API key in plaintext six times and wrote it into four config files — a plain secrets-in-output guardrail failure. I caught it reviewing the agent's own output. When I checked afterward, two of the four paths it targeted didn't exist, and the two that did held no RunPod entries. I rotated the key. But here's the lasting part: the only place copies of that key still live is the coding agent's own session logs. The cleanup was clean; the leak outlived it. **If you hand setup work to an agent, the guardrail you actually need isn't "don't print secrets" — it's an accounting of everywhere the agent's transcript is retained.**

I switched to Vast.ai. Genuinely cheaper, but it's a marketplace: a listing I'd selected at $0.37/hr had drifted to $0.47/hr by the time I rented it, and the search UI fought me the whole way. I also fat-fingered the model pull — `llama3.1:14b` errored, so I substituted `qwen2.5:14b` as my 14B-class model. Each of these is only a few minutes. Added up, minutes are the product.

## One config line moved the whole pipeline to the cloud

**The single piece of boring engineering discipline I'd built paid for itself completely.**

Moving the entire pipeline from laptop to cloud 4090 required **zero pipeline code changes**. Model construction sat behind one factory function, `get_chat_model()`. I opened an SSH tunnel from a local port to the remote Ollama port, pointed `base_url` at `localhost:11435` instead of the local `:11434`, and that was the whole change — one line of config. The business logic never knew it had moved. On the remote card, `ollama ps` confirmed both models fully in VRAM: `llama3.1:8b` at 7.0 GB, `qwen2.5:14b` at 12.0 GB, 100% on the GPU, no spill.

That's the counter-lesson to all the friction above: the abstraction I'd have skipped if I were in a hurry is exactly what absorbed the infrastructure churn. **Spend your effort on the seam between your code and the provider, not on the provider.**

## Compute was 17 cents of a 62-cent run — the other 70% was friction

**This is the whole argument in one number.**

> ### $0.165 compute · under $0.62 total · ~70% friction

The active GPU compute for the entire two-model bake-off was 534.80s + 733.29s = **1,268.09 seconds**, about 21 minutes. At the $0.47/hr I actually paid:

```
(1,268.09 / 3,600) × $0.47 = $0.165
```

Sixteen and a half cents of real compute. The total session — account setup, SSH testing, pulling models, and the instance sitting idle while I fumbled — came to under $0.62. One honesty note: that $0.62 is the **logged session total I saw, not an itemized invoice**; the per-line split of compute vs storage vs bandwidth wasn't retained. So treat $0.62 as a ceiling I can vouch for and $0.165 as the hard compute number inside it.

Subtract, and the story is stark: **roughly $0.45 of a $0.62 session — about 70% — was not compute.** It was setup, fumbling, idle time, price drift, the wrong model tag. On a personal agentic project today, the compute is nearly free; the friction is the entire bill.

## The desktop takes ~20 years to pay for itself on compute

**Buying hardware only makes sense for data sovereignty — never for cost.**

So should I buy a card and skip the marketplace? I'd reserved $2,000 and priced a desktop around a used RTX 3090 — roughly $1,700 all in[^5]. At my honest usage of about 15 GPU-hours/month, renting costs 15 × $0.47 = $7.05/month. Against that build:

```
$1,700 / $7.05 per month = 241 months ≈ 20.1 years
```

The desktop doesn't break even on compute for two decades. I dropped the eGPU middle path too — over Thunderbolt 3 you're bottlenecked to roughly 2.5 GB/s, throwing away much of a fast card's point[^6]. The only argument that survives for buying is data sovereignty: keeping sensitive inputs off someone else's machine entirely. That's a real reason. "It's cheaper" is not.

![Figure 2: The 20-Year Break-Even Curve — $1,700 Dedicated AI Rig vs. Cloud GPU Rentals](/img/projects/sl-agent-build-vs-rent-breakeven.png)

## The laptop finished 8 pages — but 1,000 would take ~164 hours

**"It works" and "it scales" are different claims, and only the first one is true here.**

The doom framing is too easy and it isn't accurate: the laptop *finished the job*. The full run exited cleanly, produced 154 observations, kept 102 verified facts, and made zero entity-misattribution errors. It didn't crash or run out of memory. What I paid was a latency penalty, not a capability failure — for an overnight batch of a handful of pages, that 6 GB card is genuinely fine, and free.

The catch is scale. At 589 seconds per page:

```
589 s × 1,000 pages / 3,600 ≈ 164 hours
```

Eight pages overnight is real. A thousand pages is a week of a machine you also need for everything else — and the direction this project eventually pivots, toward enumerating an entire region's worth of candidates, needs orders of magnitude more coverage than eight blog posts. **That's the exact point where "it finished" stops being a good enough answer.**

And the real wall was never the GPU. It's the data, the metered APIs, and the subscriptions you already pay for and still can't call from code — which is the next post.

---

## References & External Citations

[^1]: **Ollama Default Context & Silent Truncation**: Ollama defaults `num_ctx` to 2,048 tokens (increased to 4,096 in select recent model templates). When input exceeds this limit, Ollama silently truncates earlier prompt tokens without raising an error or returning a warning payload to the API client, emitting only a server log warning (`level=WARN msg="truncating input prompt"`). See [Ollama Modelfile Documentation: Valid Parameters and Values](https://github.com/ollama/ollama/blob/main/docs/modelfile.md#valid-parameters-and-values).
[^2]: **RunPod Community Cloud Pricing**: Crowdsourced GPU instances on RunPod Community Cloud list the NVIDIA GeForce RTX 4090 starting at ~$0.34/hr for spot/community availability, subject to peer host inventory. See [RunPod GPU Cloud Pricing](https://www.runpod.io/pricing).
[^3]: **RunPod Community Host Onboarding Status**: RunPod ceased onboarding new third-party hosts to its Community Cloud in early 2026 to focus infrastructure growth on verified data-center Secure Cloud tiers. While existing community hosts remain operable, new supply is constrained and the host onboarding portal is closed. See [RunPod Host Documentation & Community Status](https://docs.runpod.io/get-started/community-cloud).
[^4]: **RunPod Secure Cloud Pricing**: Enterprise-grade, data-center managed RTX 4090 instances on RunPod Secure Cloud are priced at ~$0.74/hr on-demand with guaranteed network bandwidth and SOC 2 compliance. See [RunPod Secure Cloud Pricing](https://www.runpod.io/pricing).
[^5]: **Desktop Build Component Estimates**: Sourced from PCPartPicker and secondary GPU marketplaces (eBay, r/hardwareswap) for a dedicated 24GB AI inference workstation: used RTX 3090 24GB (~$850–$950), AMD Ryzen 5 7600 (~$200), B650 motherboard (~$160), 64 GB DDR5-6000 RAM (~$170), 2 TB NVMe PCIe 4.0 SSD (~$130), 850W 80+ Gold PSU (~$120), case and dual-tower cooler (~$130); total ~$1,615–$1,765 ($1,700 typical). See [PCPartPicker System Builder](https://pcpartpicker.com/).
[^6]: **Thunderbolt 3 PCIe Bandwidth Constraints**: Thunderbolt 3 provides 40 Gbps theoretical PHY bandwidth, but its controller caps data tunneling at PCIe 3.0 x4 (32 Gbps gross, yielding ~2.5–2.75 GB/s net throughput after packet overhead), compared to 15.75 GB/s on native desktop PCIe 3.0 x16 or 31.5 GB/s on PCIe 4.0 x16. While in-VRAM token inference is unimpeded once resident, model loading and CPU-offload memory traffic over a 2.5 GB/s link incur significant bus latency. See [Intel Thunderbolt 3 Technology Brief](https://www.intel.com/content/www/us/en/architecture-and-technology/thunderbolt/thunderbolt-3-technology-brief.html) and [PCI-SIG PCIe Base Specifications](https://pcisig.com/specifications).

---

## Appendix — Claims & Sources Ledger

Every factual claim in the draft, with its pack provenance tag, source file(s), and whether it still needs an external source before publication.

**Tag key:** `[MEASURED]` / `[LOGGED]` / `[DOCUMENTED]` = stated as fact. `[INFERENCE]` = reasoning, math shown. `[EXTERNAL-CLAIM]` = about the outside world, verified and cited via footnotes `[^1]`–`[^6]`.

**Scope note (per author):** the developer's own first-hand experience is `[DOCUMENTED — developer confirmation]`, not an external claim. That covers the $0.47/hr paid, the $0.37→$0.47 price jump observed, the Vast.ai UI friction, the `llama3.1:14b` pull error, the $2,000 reserved budget, and the 15 GPU-hrs/month estimate. Citations (`[^1]`–`[^6]`) are provided for claims about the outside world (RunPod policy/prices, desktop component prices, TB3/eGPU reasoning, Ollama default behavior).

---

### Setup / innocence

| # | Claim | Tag | Source file(s) | External source needed? |
|---|---|---|---|---|
| 1 | Full cloud run billed under $0.62 total; $0.165 was active compute | DOCUMENTED (logged total, not itemized) + INFERENCE (compute) | sl-agent_09, sl-agent_13 | No — but $0.62 is a logged figure, **not** an audited invoice; itemized breakdown is a known GAP, do not fill |
| 2 | Test case: agent reading travel blogs for amenities (a family trip abroad) | DOCUMENTED | sl-agent_01, sl-agent_08 | No |
| 3 | Stack: Python 3.12, LangGraph, LangChain, SQLite (WAL), Trafilatura, Ollama | DOCUMENTED | sl-agent_01, sl-agent_02 | No |
| 4 | Hardware: Dell G7 7588, Intel i9, 32 GB RAM, GTX 1060 6 GB VRAM (~5 usable) | DOCUMENTED (developer confirmation) | sl-agent_03, sl-agent_13 | No |
| 5 | Warm single-sentence smoke: `llama3.1:8b` ~1.62 s, `qwen3` ~1.90 s | MEASURED | sl-agent_02, sl-agent_03 | No |
| 6 | The 1.9 s warm figure is explicitly not representative of real extraction | DOCUMENTED | sl-agent_03 | No |

### Hardware wall

| # | Claim | Tag | Source file(s) | External source needed? |
|---|---|---|---|---|
| 7 | Extraction chunks were 12,000 characters | DOCUMENTED | sl-agent_01, sl-agent_03 (`config.yaml` per pack) | No |
| 8 | `llama3.1:8b`: 83% GPU / 17% CPU, 5.6 GB allocated | MEASURED | sl-agent_02, sl-agent_03 | No |
| 9 | `phi4`: 55% spilled to CPU; demoted to tiebreaker | MEASURED / DOCUMENTED | sl-agent_02, sl-agent_03 | No |
| 10 | Ollama's default context window silently truncates input past its limit | EXTERNAL-CLAIM | sl-agent_03 | **Sourced** — see Footnote [^1] (Ollama `num_ctx` default truncation behavior) |
| 11 | `num_ctx` set explicitly: 8,192 local / 16,384 remote | DOCUMENTED | sl-agent_03, sl-agent_05 | No |
| 12 | Local run (`extract_v3`, `num_ctx` 8,192): 4,709.64 s (~78.5 min), ~589 s/page | MEASURED | sl-agent_02, sl-agent_03, sl-agent_04 | No |
| 13 | Remote run (`extract_v2`, `num_ctx` 16,384): 534.80 s | MEASURED | sl-agent_02, sl-agent_04, sl-agent_05 | No |
| 14 | 8.8× ratio (4,709.64 / 534.80 = 8.81) | INFERENCE | sl-agent_01, sl-agent_03 | No — **must carry the caveat: runs differ in extractor version and `num_ctx`; confounds push in opposite directions; net direction unknown; not a clean hardware ratio** |
| 15 | `extract_v3` generated 154 obs / 102 verified-kept vs `extract_v2` 140 / 78 | MEASURED | sl-agent_04 | No |

### Renting a GPU

| # | Claim | Tag | Source file(s) | External source needed? |
|---|---|---|---|---|
| 16 | RunPod Community 4090 target ~$0.34/hr | EXTERNAL-CLAIM | sl-agent_05, sl-agent_09 | **Sourced** — see Footnote [^2] (RunPod pricing page) |
| 17 | RunPod Community host onboarding closed (early 2026) | EXTERNAL-CLAIM | sl-agent_02, sl-agent_05, sl-agent_13 | **Sourced** — see Footnote [^3] (RunPod host documentation) |
| 18 | RunPod Secure 4090 ~$0.74/hr | EXTERNAL-CLAIM | sl-agent_05, sl-agent_09 | **Sourced** — see Footnote [^4] (RunPod Secure pricing) |
| 19 | Coding agent printed the API key 6× and wrote it into 4 config files (guardrail failure) | DOCUMENTED (developer confirmation) | sl-agent_02, sl-agent_05, sl-agent_13, sl-agent_14 | No |
| 20 | Developer check: 2 of 4 paths don't exist; the 2 that exist have no RunPod entries; key rotated; copies persist only in the agent's session logs | DOCUMENTED (developer check) | sl-agent_09, sl-agent_13, sl-agent_14 | No — use developer-check wording only; never "reverted/wiped"; no paths, key value, or file contents |
| 21 | Switched to Vast.ai | DOCUMENTED (developer) | sl-agent_05 | No |
| 22 | Vast.ai listing drifted $0.37 → $0.47/hr before checkout | DOCUMENTED (developer, first-hand) | sl-agent_05, sl-agent_09 | No |
| 23 | Vast.ai search UI friction | DOCUMENTED (developer, first-hand) | sl-agent_05 | No |
| 24 | `llama3.1:14b` pull errored; `qwen2.5:14b` substituted | DOCUMENTED (developer, first-hand) | sl-agent_02, sl-agent_05 | No |

### The clean win

| # | Claim | Tag | Source file(s) | External source needed? |
|---|---|---|---|---|
| 25 | `get_chat_model()` abstraction; swap to `base_url: localhost:11435` via SSH tunnel to remote `:11434`; zero pipeline code changes | DOCUMENTED | sl-agent_05, sl-agent_10, sl-agent_11 | No |
| 26 | Remote `ollama ps`: `llama3.1:8b` 7.0 GB, `qwen2.5:14b` 12.0 GB, 100% GPU at `num_ctx` 16,384 | MEASURED | sl-agent_05, sl-agent_11 | No |

### Friction over dollars

| # | Claim | Tag | Source file(s) | External source needed? |
|---|---|---|---|---|
| 27 | Active compute = 534.80 + 733.29 = 1,268.09 s (~21 min) | MEASURED | sl-agent_04, sl-agent_05, sl-agent_09, sl-agent_10 | No |
| 28 | Rate paid: $0.47/hr | DOCUMENTED (developer) | sl-agent_09 | No |
| 29 | Active compute cost = (1,268.09 / 3,600) × $0.47 = $0.165 | INFERENCE (formula shown) | sl-agent_09, sl-agent_10, sl-agent_13 | No |
| 30 | Total session under $0.62 (logged, not itemized) | DOCUMENTED (developer) + GAP (itemization) | sl-agent_09, sl-agent_13 | No — itemized breakdown is a GAP, do not fill |
| 31 | ~$0.45 / ~70% of the session was non-compute | INFERENCE | sl-agent_09, sl-agent_10 | No |

### Build vs. rent

| # | Claim | Tag | Source file(s) | External source needed? |
|---|---|---|---|---|
| 32 | $2,000 reserved budget | DOCUMENTED (developer) | sl-agent_06, sl-agent_09 | No |
| 33 | Desktop build ~$1,700 (used RTX 3090, etc.; pack range $1,615–1,765) | EXTERNAL-CLAIM (component prices) | sl-agent_06, sl-agent_09 | **Sourced** — see Footnote [^5] (PCPartPicker / market estimates) |
| 34 | ~15 GPU-hrs/month steady-state usage | DOCUMENTED (developer estimate) | sl-agent_06, sl-agent_09 | No |
| 35 | 15 × $0.47 = $7.05/month | INFERENCE | sl-agent_06, sl-agent_09 | No |
| 36 | $1,700 / $7.05 = 241 months ≈ 20.1 years break-even | INFERENCE (formula shown) | sl-agent_01, sl-agent_06, sl-agent_09 | No |
| 37 | eGPU rejected; Thunderbolt 3 ~2.5 GB/s bottleneck | EXTERNAL-CLAIM | sl-agent_06 | **Sourced** — see Footnote [^6] (Intel TB3 specs / PCIe 3.0 x4) |
| 38 | Buying justified only for data sovereignty, not cost | INFERENCE | sl-agent_06, sl-agent_09 | No |

### What "it finished" is worth

| # | Claim | Tag | Source file(s) | External source needed? |
|---|---|---|---|---|
| 39 | `extract_v3` run exited cleanly (exit code 0) | LOGGED | sl-agent_04, sl-agent_10 | No |
| 40 | 154 observations generated, 102 verified facts kept (33.8% drop) | MEASURED | sl-agent_04, sl-agent_10 | No |
| 41 | Zero entity-misattribution errors | MEASURED | sl-agent_04, sl-agent_10 | No |
| 42 | The penalty was latency, not capability | INFERENCE | sl-agent_10 | No |
| 43 | ~589 s/page → ~164 hours for 1,000 pages (589 × 1,000 / 3,600) | INFERENCE (formula shown) | sl-agent_03, sl-agent_04 | No |
| 44 | The project's later pivot needs orders-of-magnitude more coverage than 8 pages | INFERENCE / DOCUMENTED | sl-agent_08 | No |

---

### Summary

- **Total claims:** 44
- **External claims verified & sourced (`[^1]`–`[^6]`):** 6 — rows 10, 16, 17, 18, 33, 37 (all 6 now fully sourced)
- **Remaining unsourced claims:** 0
- **Depend on a logged-but-not-itemized figure (handle with care, do not present as audited):** rows 1, 30
- **Carry a mandatory caveat that must never be dropped:** row 14 (the 8.8× comparison)

#### The three mandatory checks, as resolved in this draft
1. **8.8× is not a clean comparison** (row 14). Local `extract_v3`/8,192 vs remote `extract_v2`/16,384; confounds run in opposite directions; net bias direction stated as unknown.
2. **<$0.62 is a logged session total, not an itemized invoice** (rows 1, 30). Draft says so explicitly; $0.165 is the hard compute number.
3. **RunPod config files: developer-check wording only** (row 20). No "reverted/wiped"; no paths, key value, or file contents.

#### Needs from source pack
None — every claim used in Post 1 is supported by the pack, and the `num_ctx` confound is fully documented, so mandatory check #1 resolves from the pack itself.
