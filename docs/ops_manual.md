# Operations & Maintenance Manual

Internal operations, local development commands, and deployment pipeline procedures for the Healthcare Data Scientist Portfolio website.

---

## 🛠️ Local Development & Development Commands

### 1. Installation
To install project dependencies:
```bash
npm install
```

### 2. Running Local Dev Server
To launch the Next.js local development server:
```bash
npm run dev
```
Access the application locally at `http://localhost:3000`.

### 3. Local Server for Legacy Site Comparison
To launch the legacy site on port 8080 alongside the new site:
```bash
python -m http.server 8080 --directory legacy_v1
```
- **New Site:** `http://localhost:3000`
- **Legacy Site:** `http://localhost:8080`

### 4. Testing Production Build
To verify static compilation locally before pushing to production:
```bash
npm run build
```

---

## 🚀 Deployment Pipeline (GitHub Pages)

- **Trigger:** Pushing commits to the `master` branch automatically triggers the GitHub Actions workflow defined in `.github/workflows/deploy.yml`.
- **Base Path:** GitHub Pages subpath is configured in `next.config.mjs` as `/ccdportfolio`.
- **Live URL:** `https://github-ccd.github.io/ccdportfolio/`
