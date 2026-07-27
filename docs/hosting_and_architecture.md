# Hosting & Architecture Strategy

## Hosting Options Summary

| Provider | Cost | Features & Best For | Tech Stack |
| :--- | :--- | :--- | :--- |
| **GitHub Pages** *(Primary Target)* | **$0/mo** | Integrated directly into repository (`ccdportfolio`). Deploys on `git push`. Supports custom `.com` domain. | Vite + HTML/CSS/JS, Astro, React |
| **Vercel** | **$0/mo** | Global CDN edge network, fast CI/CD preview builds per pull request. | Next.js, Vite, React, Astro |
| **Netlify** | **$0/mo** | Continuous deployment, serverless form processing. | Static, HTML/JS, Astro |

## Target Tech Stack & Maintainability Goal

1. **Framework & Styling:** Vite with modern Vanilla CSS design system (tokens, CSS custom properties, dark/light theme, glassmorphism, responsive grid).
2. **Maintenance:** Project data, publications, and blog posts stored in clean `JSON` and `Markdown` files inside the repository for frictionless updates.
3. **Deployment:** Automated CI/CD build using GitHub Actions pushing to GitHub Pages (`$0/mo`).
