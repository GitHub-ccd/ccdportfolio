---
title: "Movie Industry Market Analysis: A 2020 Bootcamp Project, Rebuilt Six Years Later"
date: "TBD — set at actual publish time, per the dating convention. Do not guess."
summary: "A Flatiron Mod 1 project from 2020, rebuilt in 2026 with a Random Forest revenue regressor and a TF-IDF critic-sentiment classifier — plus what the rebuild got wrong the first time, and what I owe a classmate credit for."
tags: ["Machine Learning", "NLP", "Random Forest", "Retrofit", "Track B"]
coverImage: "/img/projects/movie-industry-market-analysis.png"
author: "Chamila Dharmawardhana, Ph.D."
originalBloggerUrl: "https://findingdata.blogspot.com/2020/04/oops-i-did-it-again-little-wisdom-from.html"
originalDate: "2020-04-10"
---

## What this was

The assignment — Flatiron Mod 1, 2020 — used a fictional business case: pretend a company (the brief used Microsoft) wants to get into original film production and needs help figuring out what to make. Four questions came with it: which genres do best at the box office, what runtime works per genre, when's the best time of year to release, and which genre *pairs* do best. That's a real assignment premise, not something I'm claiming actually happened — worth being explicit about, because the first pass at rebuilding this in 2026 blurred it into something that read like a real consulting engagement.

The real work was EDA: pull IMDb's title/ratings/crew tables, Box Office Mojo's gross figures, Rotten Tomatoes reviews, and TMDB's metadata, then merge, clean, and chart. The provided datasets had big missing-data gaps, and a classmate — Jesse Numan — had an idea for closing them: scrape IMDbPro directly. I adapted his scraper (a JavaScript console auto-scroller plus BeautifulSoup HTML parsing to get past the login lazy-loading) and pulled about 14,000 additional records with it. That collaboration is the reason the dataset was usable at all.

Multi-label genre data was a mess — a film could carry three or four genre tags, and most standard analysis falls apart once you're not looking at one clean category. My fix was to keep only the first two genre tags per film and call the result a "binary genre." That's my own term, coined for this project.

## What changed in the 2026 rebuild

The 2020 project stopped at EDA — charts, a genre-profit breakdown, a written recommendation. No predictive model, no NLP. The rebuild added both, and neither is a refactor of something that already existed — they're new work on top of the original analysis.

**Revenue regressor.** A Random Forest trained on production budget, release month, TMDB popularity/vote metrics, and the binary-genre one-hot flags, across the 1,976 titles that survive the merge and cleaning. I picked a tree ensemble on purpose: budget doesn't map to revenue linearly — a $200M film doesn't earn ten times what a $20M film earns — and budget interacts with genre, since $50M buys a lot in horror and almost nothing in a VFX action film. A tree ensemble picks up both without me specifying either, and it doesn't assume anything about the shape of the residuals, which matters because revenue is heavily right-skewed.

With TMDB's `popularity`, `vote_average`, and `vote_count` included, $R^2 = 0.7385$. Those three features accumulate *after* a film releases and are partly driven by how well it actually did — so I re-ran the identical model without them:

```python
ablated_cols = ['production_budget', 'release_month'] + [f'genre_{g}' for g in genre_map.values()]
X_ablated = merged[ablated_cols]
# same RandomForestRegressor, same random_state=42, three fewer columns
```

$R^2$ drops to **0.5287**. I'm reporting 0.5287 as the number that means something — it's what the model can actually see before a film comes out. 0.7385 stays in, as the comparison that shows the leak, not as the headline.

**Sentiment classifier.** TF-IDF (2,500 n-gram features) into a Logistic Regression classifier on Rotten Tomatoes critic reviews, predicting Fresh vs. Rotten. The source file has 54,432 reviews; 48,869 have both review text and a label, and the model trains on all of them — accuracy 75.3%, ROC-AUC 0.8233.

**Two claims an earlier rebuild pass made that weren't true:** a Gradient Boosting Regressor compared against Random Forest — imported, never fit. Naive Bayes compared against Logistic Regression — never trained. Both are gone. A "2,380+ enriched titles" figure was also wrong — that was the pre-deduplication merge count, not the actual training set (1,976).

Baseline: [`baseline-pre-rebuild`](https://github.com/GitHub-ccd/Movie-Industry-Market-Analysis/tree/baseline-pre-rebuild-branch) — the repo exactly as it stood before any of this.

## What I think the original got wrong

The assignment asked for insights to guide a capital-allocation decision, and 2020-me delivered bar charts, pie charts, and a narrative conclusion — not anything that quantifies a prediction. For a business case explicitly about where to put money, "Family-SciFi genre does well at box office" is an observation, not a decision-ready answer. I don't think that gap was obvious to me at the time — EDA felt like the deliverable because EDA was what Mod 1 taught.

## What the original got right

The core questions — genre, runtime, seasonality, genre pairing — are still exactly what the 2026 models answer, just with a regressor and a classifier instead of a bar chart. The binary-genre taxonomy survived unchanged — a crude simplification, but the same one the 2026 feature engineering still uses. The four-source data pipeline plus the IMDbPro scrape is still the foundation everything else sits on.

## Roads not taken

| Approach | Why it was dropped |
|---|---|
| Reporting $R^2 = 0.7385$ as the headline number | Re-ran without `popularity`, `vote_average`, `vote_count` and it dropped to 0.5287 — those features are downstream of the box-office outcome, so they inflate the score without providing real pre-release signal. |
| A genre-profit table from the earlier rebuild (Animation+Adventure at $310M+, and similar) | Doesn't trace to the original 2020 EDA notebook, and contradicts that notebook's own written conclusion. Removed rather than rebuilt. |

This rebuild otherwise went in close to a straight line — Random Forest and TF-IDF picked up front, no benchmark against XGBoost, LightGBM, or a transformer embedding. That comparison work isn't done.

🔗 **GitHub Repository**: [Movie-Industry-Market-Analysis](https://github.com/GitHub-ccd/Movie-Industry-Market-Analysis)

---

*The 2026 rebuild was agent-assisted: I set the direction and the methodology, an AI agent did much of the implementation and drafting, and I've kept the pre-rebuild baseline so the change is readable.*
