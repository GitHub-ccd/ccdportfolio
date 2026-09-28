---
title: "The Smallest Honest Model: Why an 8B Beat a 14B by Knowing When to Say Null"
date: "2026-09-27" # Publication date (YYYY-MM-DD)
summary: "A naive metric said my smallest model was winning. A deterministic check said it was the least trustworthy — real failure of 87%, not 20%. The fix for hallucination wasn't a bigger model; it was fifty lines of Python and a model humble enough to return null."
tags: ["Agentic AI", "LLM Evaluation", "Hallucination", "Prompt Engineering"] # Category/Topic filter pills
coverImage: "/img/projects/sl-agent-honest-model.png" # Widescreen cover image path
author: "Chamila Dharmawardhana, Ph.D."
---

# The Smallest Honest Model: Why an 8B Beat a 14B by Knowing When to Say Null

*A naive metric told me my smallest, cheapest model was winning. A deterministic check told me it was the least trustworthy thing in the lineup — its real failure rate was 87%, not the comfortable 20% I'd been reading. The fix for the hallucination wasn't a bigger model. It was fifty lines of Python and a model humble enough to return `null`.*

---

I'm a data scientist, strong on the modeling side and a self-described novice at the software-engineering side. This is the second post in a series about building the smallest useful agentic system I could on hardware I already owned. The [first post](/blog/sl-agent_post-01) was about compute and friction — how the money was never the constraint. This one is about a quieter, more dangerous problem: an evaluation metric that told me exactly what I wanted to hear.

Once the extraction pipeline ran, I had to pick a model. I ran a three-model bake-off over the same 8 web pages — a 3B model on my laptop, and an 8B and a 14B-class model on a rented GPU — all under the same prompt and runtime settings, pulling structured amenity facts (does this lodging provide cribs? electric heaters?) for a family trip abroad. Then I scored each model with a simple, reasonable-sounding rule: *does the evidence quote the model returned actually appear verbatim on the page?* Keep the fact if yes, drop it if no.

That rule lied to me. Here's how it happened, and what finally caught it.

## The naive metric crowned the smallest model

**On the obvious check, the tiny 3B had the lowest drop rate — so it looked like the winner.**

By the simple test of "does the quote exist on the page," the drop rates came out as 19.6% for the 3B (45 of 230 facts dropped), 22.2% for the 14B (41 of 185 dropped), and 25.7% for the 8B (36 of 140 dropped). The 3B kept the most observations and dropped the least. The 8B — the one I'd eventually ship — looked like the *worst* of the three.

If I'd stopped there, I'd have picked the 3B: smallest, cheapest, runs locally on my laptop, and had the best score. The fact that the cheapest option also looked like the most accurate should have been the first thing to make me suspicious. It wasn't, yet.

## The models were quoting my own prompt back at me

**When I read the actual database rows, the models had lifted example text straight out of my prompt and pinned it to unrelated real sentences.**

My extraction prompt did what a lot of prompts do: it showed the model the desired output format with a couple of concrete example values.

```text
Put the specific finding in "value"
(e.g., "available on request, free of charge",
       "electric heaters provided in deluxe rooms").
```

The 3B and 14B took that literally. They copied those example strings verbatim and attached them to real sentences on the page that had nothing to do with the amenity[^1]. 

In one concrete row preserved in our test fixtures, the extractor claimed that "Glenesk Bungalow" offered *"electric heaters provided in deluxe rooms,"* backed by an evidence quote about the town's historical colonial architecture: *"The city is known as Little England because of its history and the many colonial structures, including municipal buildings, hotels and bungalows."* The sentence never mentions heaters, deluxe rooms, or Glenesk.

And because that colonial-buildings sentence genuinely *was* on the page, my naive check — *is the quote on the page?* — passed it with flying colors. The quote was real. The claim it supposedly supported was completely fabricated. The metric had no way to distinguish between a quote that exists and a quote that's relevant, so it recorded an outright fabrication as a clean extraction.

## Fifty lines of Python did what a bigger model couldn't

**The fix wasn't scale. It was deleting the examples from the prompt and adding a validator that can't be sweet-talked.**

Two changes, neither clever.

First, I stripped every concrete example value out of the prompt template[^2]. Instead of showing the model `e.g., "available on request, free of charge,"` the rule became abstract: the value must state an explicit factual condition drawn directly from the evidence, and every key word in the value must be supported by words in the quote. With no example strings sitting in the prompt, there was nothing for the model to copy.

Second, I wrote a three-stage deterministic verification guard — about fifty lines of ordinary Python, with no LLM judge involved:

```python
def check_evidence_support(evidence, page_text, entity_name=None,
                           attribute="", value_text="", min_overlap=0.5):
    # 1. quote must exist verbatim on the page
    if norm_evidence not in norm_page:
        return False, "evidence_not_in_page"
    # 2. if the model named an owner, that name must appear in the quote
    if entity_name and not all(t in norm_evidence for t in check_tokens):
        return False, "entity_not_in_evidence"
    # 3. >=50% of the meaningful content words in the value must appear in the quote
    if overlap < min_overlap:
        return False, "value_not_in_evidence"
    return True, None
```

In plain terms:
1. The quote has to appear verbatim on the page (`evidence_not_in_page`).
2. If the model attached the fact to a specific hotel, that hotel's distinctive name tokens must appear inside the quote (`entity_not_in_evidence`).
3. At least half the meaningful content words in the claimed value (ignoring filler words like "the" and "of") must appear in the quote too (`value_not_in_evidence`)[^3].

That last stage is what would have caught the heaters claim instantly: none of the content words "electric," "heaters," or "deluxe" appear anywhere in a sentence about colonial architecture (0% overlap vs. the required 50% threshold).

None of this needs a GPU or a bigger model. You can write it in an afternoon. That is exactly the point.

![Figure 1: The 3-Stage Deterministic Verification Pipeline](/img/projects/sl-agent-deterministic-validator-flow.png)

## Rescored honestly, 20% failure became 44–87%

**Run the same model outputs back through the deterministic check, and the comfortable 20% numbers collapse.**

> ### Naive check: ~20% dropped. Deterministic check: 44%, 72%, 87% dropped.

| Model | Naive drop rate | Real failure rate | Quote missing | Entity mismatch | Value mismatch | Verified facts kept |
|---|---|---|---|---|---|---|
| 3B (`llama3.2`) | 19.6% | **87.4%** | 45 | 89 | 67 | 29 |
| 14B (`qwen2.5`) | 22.2% | **72.4%** | 41 | 60 | 33 | 51 |
| **8B (`llama3.1`)** | **25.7%** | **44.3%** | 36 | **0** | 26 | **78** |

The model that looked *worst* under the naive metric — the 8B, at 25.7% — had the lowest real failure rate at 44.3%, and kept the most verified facts (78). The tiny 3B that looked best was actually failing 87% of the time; out of 230 facts it produced, only 29 survived honest scrutiny.

One honesty note, which I'll come back to: this is a *rescore* of the original outputs under the stricter rules, not three fresh runs. It's a fair way to expose the defect, but it isn't a clean re-benchmark.

![Figure 2: The Evaluation Mirage — Naive vs. Real Failure Rates](/img/projects/sl-agent-evaluation-bakeoff-drop-rates.png)

## The 8B won by saying "I don't know"

**It didn't win on size or speed. It won because it never invented an owner for a fact it couldn't attribute.**

The deterministic check sorts failures into three kinds, and one matters more than the others: attaching a fact to the wrong entity. Getting the amenity slightly wrong is a nuisance; confidently telling a family that *this specific hotel* has a crib when it doesn't is the failure that makes the whole system untrustworthy.

On that measure, the 8B scored zero. Zero entity misattributions across the entire run. When it couldn't tell which property a fact belonged to, it left the owner field as `null` instead of guessing[^4]. The 14B, given the same ambiguity, guessed — and ran up 60 entity mismatches doing it.

That's what "honest" means for a model in this setting: not accuracy in the abstract, but a willingness to leave a field blank rather than fill it with a plausible fabrication. When I re-ran the chosen 8B fresh under the new prompt (`extract_v3`), it produced 154 observations, kept 102 verified facts, and again logged zero entity misattributions and zero prompt-example leaks — about 31% more verified facts than the old prompt had yielded:

$$\frac{102 - 78}{78} \approx 30.8\%$$

## The honest caveat: this comparison isn't finished

**I named the 8B my baseline, but I never re-ran the 14B fresh under the new prompt — so the head-to-head is incomplete, and I won't pretend otherwise.**

The real drop rates for the 3B and 14B come from rescoring their *old* outputs against the new rules, not from fresh runs under the stripped-down prompt. By the time the deterministic check existed, the rented GPU was already torn down — that entire cloud session cost under 62 cents, and I'd shut it off. So the 14B never got a clean second run.

What's solid: the 8B's zero-misattribution result and its fresh-run numbers are measured directly, not rescored. What's still owed: a full three-way comparison with all three models re-run under the new prompt. The 8B earned the baseline on honest, measured grounds — but I'm reporting the edge of the evidence, not painting over it.

## What carries out of this

Two lessons. First, **a naive evaluation metric is worse than no metric**, because it manufactures confidence you haven't earned. My 20% drop rate felt fine, and it was hiding an 87% failure. If you're evaluating an extractor, test whether the evidence *supports* the claim, not merely whether it exists.

Second, **the durable fix for LLM hallucination here wasn't a bigger model — it was deterministic code guarding a humble one**. The 14B, with nearly twice the parameters, failed 72% of the time and invented owners freely. Fifty lines of Python and a model willing to say `null` beat it outright. Bigger didn't mean more truthful. Structure did.

But a trustworthy extractor is only worth something if you can feed it pages to read. And getting the pages — past bot walls, metered APIs, and the AI subscriptions you already pay for and still can't call from code — turned out to be the hardest wall of all. That's the next post.

---

## References & Methodological Notes

[^1]: **In-Context Exemplar Contamination & Demonstration Leakage**: When language models are prompted with concrete few-shot examples or formatted value demonstrations, generative decoders exhibit a strong inductive bias toward repeating surface tokens of the examples rather than synthesizing extractions from the input text. In information extraction, this manifests as "prompt leakage," where demonstrated strings are erroneously attached to irrelevant text passages that match superficial syntactic patterns. See Min et al., *Rethinking the Role of Demonstrations: What Makes In-Context Learning Work?* (EMNLP 2022) and Zhao et al., *Calibrate Before Use: Improving Few-Shot Performance of Language Models* (ICML 2021).

[^2]: **Abstract Constraint Prompts vs. Few-Shot Exemplars**: The project repository tracks this transition from `prompts/extract_v2.md` to `prompts/extract_v3.md`. In v2, the template provided concrete instances: `Put the specific finding in "value" (e.g., "available on request, free of charge", "electric heaters provided in deluxe rooms")`. In v3, concrete strings were completely replaced with semantic boundary constraints: `"value" must contain the specific factual condition, policy, or measurement directly stated in the evidence text. Every key word in "value" must be supported by the words in "evidence"`. See project file [extract_v3.md](file:///e:/My_GitHub__projects/vaccation_planning/discovery/prompts/extract_v3.md).

[^3]: **Token Overlap & Factual Grounding Verification**: Substring matching verifies text presence on a web page, but cannot detect semantic detachment between a claim and its citation. The 50% non-stopword token overlap threshold (`min_value_evidence_overlap = 0.5`) in `check_evidence_support()` implements a deterministic lexical alignment check inspired by factual consistency evaluation metrics (e.g., Wang et al., *FactCC: Evaluating Factual Consistency in Summarization with BERT*, EMNLP 2020), ensuring that claimed attributes and values are lexically grounded in the supporting sentence before database persistence. Implemented in [extract.py](file:///e:/My_GitHub__projects/vaccation_planning/discovery/discovery_agent/extract.py#L78-L131).

[^4]: **Selective Abstention and Epistemic Calibration in LLMs**: Calibrated models that output `null` or abstain under ambiguity routinely outperform nominally higher-parameter models on real-world downstream reliability. Larger models often suffer from overconfidence, filling schema slots with plausible fabrications when evidence is ambiguous. See Kadavath et al., *Language Models (Mostly) Know What They Know* (Anthropic, 2022); and Kuhn, Gal, & Farquhar, *Semantic Uncertainty: Predicting Language Model Hallucinations* (Nature, 2023).

---

## Appendix — Claims & Sources Ledger

Every factual claim in the post, with its pack provenance tag, source file(s), and verification status.

**Tag key:** `[MEASURED]` / `[LOGGED]` / `[DOCUMENTED]` = stated as fact. `[INFERENCE]` = reasoning, math shown. `[EXTERNAL-CLAIM]` = about the outside world, verified and cited via footnotes `[^1]`–`[^4]`.

**Scope note:** Post 2 rests entirely on internal, measured project evidence (bake-off numbers, database rows, code, prompt files) and methodological grounding on LLM evaluation.

### Setup

| # | Claim | Tag | Source file(s) | Verification status |
|---|---|---|---|---|
| 1 | Three-model bake-off: `llama3.2` (3B, local), `llama3.1:8b` (remote), `qwen2.5:14b` (remote) | LOGGED | [sl-agent_02](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_02_timeline.md), [sl-agent_04](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_04_bakeoff_and_quality.md) | Verified internal log (`PROGRESS.md` L131–135) |
| 2 | Same 8 captures; `extract_v2`; `num_ctx` 16,384; `num_predict` 2,500 | LOGGED / DOCUMENTED | [sl-agent_02](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_02_timeline.md), [sl-agent_04](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_04_bakeoff_and_quality.md), [sl-agent_05](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_05_renting_gpus.md) | Verified internal log |
| 3 | Task: extract structured amenity facts (a family trip abroad) | DOCUMENTED | [sl-agent_01](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_01_thesis_and_arc.md), [sl-agent_08](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_08_data_walls.md) | Verified internal design |
| 4 | Naive scoring rule = quote exists verbatim on the page | DOCUMENTED | [sl-agent_04](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_04_bakeoff_and_quality.md) | Verified internal code (`extract.py` v2 check) |

### The naive result

| # | Claim | Tag | Source file(s) | Verification status |
|---|---|---|---|---|
| 5 | Naive drop rates: 3B 19.6% (45/230), 14B 22.2% (41/185), 8B 25.7% (36/140) | MEASURED | [sl-agent_02](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_02_timeline.md), [sl-agent_04](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_04_bakeoff_and_quality.md) | Verified SQLite database records |
| 6 | Naively the 3B kept the most / looked best; the 8B looked worst | MEASURED / INFERENCE | [sl-agent_04](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_04_bakeoff_and_quality.md) | Verified bake-off data |

### The prompt-leak defect

| # | Claim | Tag | Source file(s) | Verification status |
|---|---|---|---|---|
| 7 | Prompt v2 included concrete example values ("available on request, free of charge"; "electric heaters provided in deluxe rooms") | DOCUMENTED | [sl-agent_04](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_04_bakeoff_and_quality.md), [sl-agent_11](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_11_artifacts_and_excerpts.md) | Verified — see Footnote [^1], [^2] |
| 8 | 3B and 14B copied those example strings and welded them to unrelated real page sentences | LOGGED / DOCUMENTED | [sl-agent_02](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_02_timeline.md), [sl-agent_04](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_04_bakeoff_and_quality.md), [sl-agent_11](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_11_artifacts_and_excerpts.md) | Verified test fixture (`test_extract.py` L92–111) |
| 9 | The naive substring check passed them because the quote existed on the page though it didn't support the claim | DOCUMENTED | [sl-agent_04](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_04_bakeoff_and_quality.md) | Verified pipeline behavior |

### The fix

| # | Claim | Tag | Source file(s) | Verification status |
|---|---|---|---|---|
| 10 | Prompt v3 stripped all concrete example values; rule made abstract | DOCUMENTED | [sl-agent_04](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_04_bakeoff_and_quality.md), [sl-agent_11](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_11_artifacts_and_excerpts.md) | Verified prompt diff — see Footnote [^2] |
| 11 | `check_evidence_support()` — 3-stage deterministic check: quote-on-page; entity tokens in quote; ≥50% value/quote overlap | DOCUMENTED | [sl-agent_04](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_04_bakeoff_and_quality.md), [sl-agent_10](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_10_counter_evidence.md), [sl-agent_11](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_11_artifacts_and_excerpts.md) | Verified in [extract.py](file:///e:/My_GitHub__projects/vaccation_planning/discovery/discovery_agent/extract.py#L78-L131) — see Footnote [^3] |

### Rescoring

| # | Claim | Tag | Source file(s) | Verification status |
|---|---|---|---|---|
| 12 | Retrospective rescoring (v2 outputs under v3 rules): real drop 3B 87.4% (201/230), 14B 72.4% (134/185), 8B 44.3% (62/140) | MEASURED | [sl-agent_02](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_02_timeline.md), [sl-agent_04](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_04_bakeoff_and_quality.md), [sl-agent_11](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_11_artifacts_and_excerpts.md) | Verified SQLite rescore results |
| 13 | Verified facts kept: 3B 29, 14B 51, 8B 78 | MEASURED | [sl-agent_04](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_04_bakeoff_and_quality.md), [sl-agent_11](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_11_artifacts_and_excerpts.md) | Verified |
| 14 | The 8B had the worst naive rate but the lowest real drop and the most kept | INFERENCE | [sl-agent_04](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_04_bakeoff_and_quality.md) | Verified |
| 15 | The rescoring is a re-run of existing outputs under stricter rules, not fresh runs | DOCUMENTED | [sl-agent_04](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_04_bakeoff_and_quality.md) | Stated explicitly as an honest caveat |

### Why the 8B won

| # | Claim | Tag | Source file(s) | Verification status |
|---|---|---|---|---|
| 16 | 8B entity misattributions = 0; preferred `entity_name=null` when ambiguous | MEASURED | [sl-agent_02](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_02_timeline.md), [sl-agent_04](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_04_bakeoff_and_quality.md), [sl-agent_11](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_11_artifacts_and_excerpts.md) | Verified — see Footnote [^4] |
| 17 | 14B had 60 entity mismatches | MEASURED | [sl-agent_02](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_02_timeline.md), [sl-agent_04](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_04_bakeoff_and_quality.md) | Verified |
| 18 | Fresh 8B v3 run: 154 observations, 102 kept, 0 entity misattribution, 0 prompt-example leaks | MEASURED | [sl-agent_03](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_03_local_llm_on_a_laptop.md), [sl-agent_04](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_04_bakeoff_and_quality.md), [sl-agent_10](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_10_counter_evidence.md) | Verified (`PROGRESS.md` L155–166) |
| 19 | +30.8% verified observations vs old prompt: `(102 − 78) / 78 ≈ 30.77%` | INFERENCE (formula shown) | [sl-agent_04](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_04_bakeoff_and_quality.md), [sl-agent_10](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_10_counter_evidence.md) | Verified |

### The caveat

| # | Claim | Tag | Source file(s) | Verification status |
|---|---|---|---|---|
| 20 | The 14B was never re-run fresh under v3; only retrospectively rescored; cross-model v3 comparison is incomplete | DOCUMENTED | [sl-agent_02](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_02_timeline.md), [sl-agent_04](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_04_bakeoff_and_quality.md) | Mandatory caveat, stated prominently in draft |
| 21 | The 8B was designated baseline (`extract_v3`, `min_value_evidence_overlap` 0.5) | DOCUMENTED | [sl-agent_02](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_02_timeline.md), [sl-agent_04](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_04_bakeoff_and_quality.md) | Verified (`config.yaml` L36) |
| 22 | The rented GPU was torn down before the v3 check existed (session cost under $0.62) | DOCUMENTED | [sl-agent_04](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_04_bakeoff_and_quality.md), [sl-agent_05](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_05_renting_gpus.md) | Handled with care: $0.62 is logged total, not itemized invoice |

### The lesson / counter-evidence

| # | Claim | Tag | Source file(s) | Verification status |
|---|---|---|---|---|
| 23 | Deterministic post-processing beat model size (larger 14B failed 72.4% of the time) | MEASURED / INFERENCE | [sl-agent_04](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_04_bakeoff_and_quality.md), [sl-agent_10](file:///e:/My_GitHub__projects/vaccation_planning/discovery/blog-source/sl-agent_10_counter_evidence.md) | Verified core finding |

---

### Summary

- **Total claims:** 23
- **External / Methodological citations provided (`[^1]`–`[^4]`):** 4
- **Mandatory caveat preserved:** row 20 (the 14B was never re-run fresh under v3; the comparison is incomplete)
- **Logged-not-itemized figure handled with care:** row 22 (the <$0.62 session total)
