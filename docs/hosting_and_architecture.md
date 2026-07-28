# Hosting & Architecture Strategy

## ☁️ Hosting Strategy: GitHub Pages & Vercel ($0 Free Tier)

Both **GitHub Pages** and **Vercel** offer generous, permanent free tiers for static websites and front-end applications.

| Provider | Free Tier Benefits | Best Used For |
| :--- | :--- | :--- |
| **GitHub Pages** *(Primary Choice)* | • **$0/month permanent free tier**<br>• **Global CDN powered by Fastly** for fast worldwide loading<br>• Directly hosted from repository (`ccdportfolio`) on `git push`<br>• Custom domain support with free HTTPS/SSL<br>• Unlimited static bandwidth | Main Portfolio Site, Resumes, Case Studies, Markdown Blog |
| **Vercel** | • **$0/month Hobby tier**<br>• **Vercel Global Edge Network CDN**<br>• Instant preview deployments per git pull request<br>• Easy integration if upgrading to dynamic Next.js/React later | Staging previews or dynamic React/Next.js deployments |

---

## 🏷️ Domain & Personal Branding Strategy

**Full Name:** Chamila Chathuranga Dharmawardhana  
**Initials:** CCD (`ccdportfolio`)  
**Target Audience:** Healthcare AI, Bioinformatics, Data Science recruiters, academic collaborators, and industry leaders.

### 💡 Strategic Branding Angles:

1. **Option 1: The Modern AI/Tech Moniker (Short & Memorable)**
   * **`chamila.ai`** or **`chamila.dev`** — Ultra-clean, modern, and instantly communicates your expertise in Health AI/Tech.
   * **`chamilad.com`** or **`chamilad.io`** — Reclaims your previous personal handle; short and easy to spell.

2. **Option 2: The Domain-Specialist Brand (Name + Expertise)**
   * **`chamiladata.com`** or **`chamiladata.ai`** — Clearly frames you as a Data Scientist.
   * **`chamilalab.com`** or **`chamilahq.com`** — Authoritative feel for research, projects, and publication hubs.

3. **Option 3: The Shortened Moniker (International Pronunciation)**
   * **`chamiladharma.com`** / **`chamiladharma.ai`** — Uses "Dharma" as a memorable, rhythmic short form of Dharmawardhana that non-Sinhala speakers can easily spell and pronounce.

4. **Option 4: The Initials / Monogram Brand**
   * **`ccddata.com`** or **`chamilaccd.com`** — Matches your GitHub handle (`GitHub-ccd`) and repo name (`ccdportfolio`).

### 🛍️ Recommended Modern Registrars (Post-Google Domains)
1. **Cloudflare Registrar:** At-cost domain pricing with zero markup, free WHOIS privacy, and world-class DNS.
2. **Porkbun:** Extremely cheap, developer-friendly, includes free WHOIS privacy.
3. **Namecheap:** Solid backup with free privacy protection.

---

## 🔮 Future-Proofing Dynamic Content (Blog, Vlog & Apps)

### 1. ✍️ Blog / Articles (Build-Time Static Generation)
* Articles are written in simple `.md` (Markdown) or `.json` files inside the repository and compiled to static HTML on GitHub Pages.

### 2. 📹 Vlogs & Video Content (Embedded Media Architecture)
* Hosted on free video platforms (**YouTube**, **Vimeo**, or **Loom**) and embedded via responsive video cards.

### 3. 🧪 Interactive Data Science Apps & ML Models
* Python ML apps (Streamlit, Gradio, Hugging Face Spaces) run free on **Hugging Face Spaces** or **Streamlit Cloud** and link directly from portfolio cards.

### 4. 🌐 Subdomains & Modular Services
* Subdomains (e.g. `blog.yourdomain.com` or `app.yourdomain.com`) can point to any service without changing your main portfolio host.
