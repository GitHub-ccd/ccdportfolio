# Hosting & Architecture Strategy

## ☁️ Hosting Strategy: GitHub Pages & Vercel ($0 Free Tier)

Both **GitHub Pages** and **Vercel** offer generous, permanent free tiers for static websites and front-end applications.

| Provider | Free Tier Benefits | Best Used For |
| :--- | :--- | :--- |
| **GitHub Pages** *(Primary Choice)* | • $0/month permanent free tier<br>• Directly hosted from repository (`ccdportfolio`) on `git push`<br>• Custom `.com` domain with free HTTPS/SSL<br>• Unlimited static bandwidth for normal sites | Main Portfolio Site, Resumes, Case Studies, Markdown Blog |
| **Vercel** | • $0/month Hobby tier<br>• Instant preview deployments per git pull request<br>• Automatic global CDN edge network<br>• Easy integration if upgrading to Next.js/React later | Staging previews or dynamic React/Next.js deployments |

---

## 🔮 Future-Proofing Dynamic Content (Blog, Vlog & Apps)

**You are 100% correct!** You do not need a complex or costly server today to support future dynamic content. Here is how dynamic features scale seamlessly:

### 1. ✍️ Blog / Articles (Build-Time Static Generation)
* **How it works:** Articles are written in simple `.md` (Markdown) or `.json` files inside the repository.
* **Why it's free:** When you save a new article, GitHub Actions or Vercel automatically compiles your markdown into clean static HTML pages at build time. No database or server cost required.

### 2. 📹 Vlogs & Video Content (Embedded Media Architecture)
* **How it works:** Video files should not be served directly from a web host (to avoid high bandwidth). Videos are hosted on free dedicated platforms (**YouTube**, **Vimeo**, or **Loom**).
* **Portfolio Integration:** Embedded responsive video components showcase your talks/vlogs directly on your portfolio page without any hosting costs or performance slowdowns.

### 3. 🧪 Interactive Data Science Apps & ML Models
* **How it works:** Interactive Python ML apps (Streamlit, Gradio, Hugging Face Spaces) are hosted for free on **Hugging Face Spaces** or **Streamlit Community Cloud**.
* **Portfolio Integration:** Your portfolio embeds or links to live interactive demos, keeping the main portfolio fast and static.

### 4. 🌐 Subdomains & Modular Services
* If you ever build a separate micro-app or specialized blog platform later, you can simply point a subdomain (e.g. `blog.yourname.com` or `app.yourname.com`) to any platform without touching your main portfolio site.
