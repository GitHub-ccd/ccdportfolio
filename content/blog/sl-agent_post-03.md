---
title: "Part 3: The AI I Already Pay For Can't Be Called From Code"
date: "2026-09-27" # Publication date (YYYY-MM-DD)
summary: "I'd beaten the compute wall and the quality wall. The tallest one was the data layer: an AI I pay $40/month for that no script can call, an open web that yielded usable text from 8 of 36 pages, and platforms that keep shutting down. The way through wasn't more scraping or a bigger subscription — it was inverting the funnel onto a free, structured ID."
tags: ["Agentic AI", "APIs", "Web Scraping", "Software Architecture"] # Category/Topic filter pills
coverImage: "/img/projects/sl-agent-data-wall.png" # Widescreen cover image path
author: "Chamila Dharmawardhana, Ph.D."
---

# Part 3: The AI I Already Pay For Can't Be Called From Code

*I'd beaten the compute wall and the quality wall. The real one was the data layer: the AI I already pay about $40 a month for can't be called from a script, the open web gave me usable text from 8 of 36 pages, and the platforms I'd have leaned on keep shutting down. The way through wasn't more scraping or a bigger subscription — it was inverting the funnel onto a free, structured ID.*

---

This is the third post in a series about building the smallest useful agentic system I could on hardware I already owned. By now I'd solved the two problems I expected to be hard. [Post 1](/blog/sl-agent_post-01) was compute: a local GPU is slow, the cloud is nearly free, and the real cost is friction. [Post 2](/blog/sl-agent_post-02) was quality: a small, honest model wrapped in deterministic checks beats a bigger one. I had a working extractor returning trustworthy facts for cents.

What I hadn't solved was the thing that turned out to matter most — getting data to extract from. My agent needed two things: a seed list of places to look at, and text about each one. There were two obvious ways to get them: ask an LLM, or scrape the open web. Both walls were taller than the hardware.

## The AI I already pay for can't be called from code

**I pay about $40 a month across two consumer AI subscriptions. Not one dollar of it is callable from a Python script.**

> ### $40/month in AI subscriptions. $0 of it callable from code.

I pay for Google One AI Premium ($19.99/month)[^1] and Claude Pro ($20/month)[^2]. Both are excellent — for typing into a chat box. Neither includes programmatic API access[^3]. To call the same models from code, you need a separate developer account on Google AI Studio or Anthropic Console with its own pay-per-token metered billing[^4]. You pay once for the interactive web subscription, and you pay again for the API. Same intelligence, two invoices.

I want to be precise about how I learned this, because it would be easy to dramatise. I did not hit an authentication error or a failed call. There was no traceback. I read the pricing pages, licensing terms, and provider documentation, and found there was simply no callable API endpoint attached to the plan I was already paying for. That's not a bug — it's the business model. A consumer plan funds a chat window; developer code access is sold separately.

The takeaway is unglamorous: a consumer subscription is not an API, however good the model behind it is. Budget for AI twice, or architect around it.

## And the tooling keeps shutting down

**The free-ish programmatic paths I might have fallen back on were closing or churning underneath me.**

The CLI route I'd have reached for — signing into a developer CLI with a consumer subscription — had its subscription authentication shut down on June 18, 2026[^5], replaced by interactive coding agent environments that operate behind strict seat quotas rather than general-purpose callable backends. 

On the travel-data side, Amadeus's free self-service tier — long a standard starting point for open hotel data tutorials — was decommissioned on July 17, 2026[^6], taking its roughly 2,000-calls/month free allowance with it and stranding a generation of community tooling and tutorials that still assume it exists.

None of these is a catastrophe alone. Together they're the texture of building an AI agent stack in late 2026: the ground you're standing on keeps moving. What was free last year is metered now; what had an open CLI login has an interactive assistant instead; the API every tutorial reaches for was retired last quarter. For a personal project, the churn is the tax — not the price.

## The open web gave me 8 usable pages out of 36

**So I tried scraping. Of 36 sources I fetched, exactly 8 returned usable text — a 22% yield.**

> ### 40 URLs discovered → 36 unique sources → 8 usable pages (22%)

Five search queries surfaced 40 URLs; after deduplication, 36 unique sources; I fetched all 36 and got usable prose from 8. Where did the rest go? Every one of the 8 TripAdvisor pages returned HTTP 403 — Cloudflare blocks a plain HTTP GET outright. Nine social links (Facebook, Instagram) sat behind auth walls. I'd pre-blocked 18 booking aggregators (Booking, Agoda, Expedia, and the rest) from the search itself, because scraping them directly violates their terms and is a fast way to get an IP blacklisted. What remained was a scatter of 404s, one SSL error, and a page that returned 200 with zero extractable text — a JavaScript shell with nothing for a text parser to hold.

And this is where the destination matters. The trip was to Sri Lanka, and Sri Lanka is the kind of place where the sanctioned fallbacks run shallow: a substantial portion of authentic family accommodation consists of informal guesthouses and heritage tea bungalows that operate outside global GDS inventory distribution networks[^7]. B2B aggregator APIs like LiteAPI could not confirm regional Sri Lankan inventory depth, and Amadeus Self-Service was shut down. 

The metered routes that remain are throttled or thin: TripAdvisor's Content API has a free self-serve tier but caps it at 5,000 calls/month (with 5 reviews and 5 photos per property)[^8]; and search APIs meter after a modest trial allocation[^9]. The open web was walled, and the legal side doors were narrow.

The honest takeaway: "just scrape it" has a real success rate, and for the open travel web mine was 22% — before you even ask whether the pages you got were the pages you needed.

## I rejected "give up" and inverted the funnel

**The blocks weren't a surprise, and they weren't the end. They were the signal to change the architecture.**

It's tempting to tell this as a defeat, and it wasn't. The OTA and social blocks were predicted in advance — I expected TripAdvisor and Booking to fight a scraper. The extractor from Post 2 worked; it had just pulled 102 verified facts. So when I looked at a 22% yield and a pile of fuzzy, un-deduplicated place names, I didn't conclude the project was impossible. I asked for a better shape.

The fix was to invert the funnel. Instead of scraping the open web for places I couldn't even enumerate, I anchored on a free, structured identifier. Google's Places API (New) returns place IDs at $0.00 cost under its "Essentials (IDs Only)" SKU when you request only the `places.id` field mask[^10]. 

This allowed me to tile a geographic grid across an entire route and enumerate hundreds of candidate properties for nothing, giving each one a canonical `place_id` — a globally unique primary key that ends the entity-deduplication nightmare before it starts. Cheap and wide first: enumerate everything free, filter by operational status and rating, and then spend API quota or compute only enriching the handful of candidates that survive filtering. The trustworthy-but-slow extractor from Post 2 wasn't thrown away — it moved to the last stage, run only on the high-priority survivors.

Making that switch meant deleting about 2,085 lines of scraping code (across 6 files, commit `76210cb`). It felt like progress, not loss. When the open web won't give you a clean seed list, stop scraping for identity and get it — free — from a structured API. Anchor on the ID before you parse the prose.

![Figure 1: Architectural Evolution — Open Scraping Pipeline vs. The Inverted Places Funnel](/img/projects/sl-agent-architecture-evolution-funnel.png)

## What the three walls add up to

Three walls, and not one was the one I expected. The compute wall turned out to be friction, not cost — 62 cents, most of it setup. The quality wall turned out to be honesty, not model size — fifty lines of Python beat a 14B. And the data wall, the tallest, turned out to be fragmentation and policy churn: an AI I pay for and can't call, a web I can't scrape, and platforms retiring under me.

So the honest thesis isn't "AI is too expensive for individuals," and it isn't "the open web is dead." It's narrower and more useful: **after mid-2026, a small personal agent is bottlenecked by friction, fragmentation, and churn far more than by dollars.** The free tiers that did work carried real weight — a search API returned 40 results across five queries for nothing — but a free tier is weather, not climate, and you should build as if any of them could close next quarter.

The way through was boring on purpose: rent, don't buy; wrap humble models in deterministic checks; anchor on free structured IDs before you touch unstructured text; and treat every free tier and convenient login as temporary. None of it needed a $2,000 rig or an enterprise contract. It needed refusing two tempting conclusions — "buy more hardware" and "give up" — and doing the less glamorous engineering instead.

![Figure 2: Developer Decision Tree — Local vs. Rent vs. Cloud APIs](/img/projects/sl-agent-developer-decision-tree.png)

---

## References & External Citations

[^1]: **Google One AI Premium Subscription Pricing**: Google's consumer AI plan is priced at $19.99/month, providing 2 TB cloud storage alongside Gemini Advanced web/mobile chat access. See [Google One AI Premium Plans](https://one.google.com/about/plans).

[^2]: **Anthropic Claude Pro Subscription Pricing**: Claude Pro is priced at $20/month (+ taxes), offering priority access to Claude 3.5 Sonnet, increased usage limits, and early feature access via the web and mobile interfaces. See [Anthropic Claude Pro Pricing](https://www.anthropic.com/pricing).

[^3]: **Consumer Subscription Licensing & API Access Restrictions**: Consumer AI plans (Google One AI Premium, Claude Pro, ChatGPT Plus) are explicitly restricted to interactive user sessions via first-party web and mobile interfaces. They do not include programmatic API keys, programmatic rate quotas, or programmatic developer endpoints. See [Anthropic Terms of Service: Commercial vs. Consumer Plans](https://www.anthropic.com/legal/consumer-terms) and [Google Gemini Terms of Service](https://support.google.com/gemini/answer/13594961).

[^4]: **Metered Developer API Pricing Models**: Programmatic model execution requires separate cloud developer accounts governed by per-token pricing (e.g., Google AI Studio / Vertex AI for Gemini, Anthropic Console for Claude). Token rates range from ~$0.15/M input tokens on lightweight models (Gemini Flash) to ~$3.00/M on frontier models (Claude 3.5 Sonnet). See [Google AI Studio Pricing](https://ai.google.dev/pricing) and [Anthropic API Pricing](https://www.anthropic.com/pricing#api).

[^5]: **Gemini CLI Subscription Authentication Sunset**: On June 18, 2026, Google sunset the legacy `gemini login` subscription-based CLI authentication flow, transitioning developer terminal workflows to the Google Antigravity autonomous coding agent environment. The modern agent environment enforces interactive developer session quotas rather than serving as an open, scriptable headless backend. See [Google Developer Tools Release Notes](https://ai.google.dev/).

[^6]: **Amadeus Self-Service Portal Decommissioning**: Amadeus officially decommissioned its legacy Self-Service developer portal on July 17, 2026, retiring its free tier (which historically granted registered developers ~2,000 monthly free test transactions across Hotel List, Flight Search, and Points of Interest endpoints) in favor of commercial enterprise contracts. See [Amadeus for Developers Retirement Notice](https://developers.amadeus.com/).

[^7]: **Sri Lanka Hospitality Market & Informal Lodging Distribution**: According to the Sri Lanka Tourism Development Authority (SLTDA) Annual Statistical Reports, informal accommodation (unregistered homestays, heritage tea estate bungalows, and small family guesthouses) accounts for over 40–50% of room capacity in regional destinations like Nuwara Eliya, Ella, and Kandy. These properties operate largely outside global Global Distribution Systems (GDS) and enterprise bedbanks (such as LiteAPI) due to high OTA commission rates (15–25%), relying instead on local drivers, cash payments, or WhatsApp coordination. See [SLTDA Tourism Research & Statistics](https://www.sltda.gov.lk/en/statistics).

[^8]: **TripAdvisor Content API Free Tier Limits**: The TripAdvisor Content API provides a self-service partner tier granting registered developers up to 5,000 free API calls per month, with strict payload caps of 5 reviews and 5 photos per property. See [TripAdvisor Developer Portal Documentation](https://developer-tripadvisor.com/content-api/).

[^9]: **Search API Free Tier Quotas (SerpApi & Tavily)**: SerpApi provides a free developer tier capped at 100 searches/month before metered pricing applies. Tavily Search API provides 1,000 free search credits/month on its initial developer plan. See [SerpApi Pricing](https://serpapi.com/pricing) and [Tavily AI Pricing](https://tavily.com/#pricing).

[^10]: **Google Places API (New) "IDs Only" $0 SKU**: Under Google Maps Platform pricing, both Text Search (New) and Place Details (New) include an "Essentials (IDs Only)" SKU billed at $0.00 with unlimited usage, provided the request's field mask is strictly restricted to `places.id`. Requesting additional fields (e.g., `places.displayName`, `places.rating`, `places.formattedAddress`) escalates the call to billable Essentials, Pro, or Enterprise tiers. See [Google Maps Platform Places API (New) Pricing](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing).


