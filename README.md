# Static Order App

This repository contains two simple web interfaces for managing a small business inventory and for capturing customer orders. All pages are plain HTML, CSS and JavaScript so they can be hosted on any static site provider.

## File layout

- `owner.html`, `owner.css`, `owner.js` – form and table for entering products and printing a basic inventory.
- `consumer.html`, `consumer.css`, `consumer.js` – customer‑facing page to browse items and create an order.
- `_headers` – Netlify configuration adding a `Content‑Security‑Policy` header to restrict where scripts and styles load from.
- `CNAME` / `cname` – example domain files for GitHub Pages and Netlify.
- `troubleshooting.md` – tips for diagnosing common HTML/CSS/JS issues.

## Serving the site

Because everything is static there is no build step. A quick way to preview locally is:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

### Deploying to Netlify
1. Create a Netlify account.
2. Add this repository and choose **No build command**.
3. The publish directory is the repository root.
4. Netlify will automatically read the `_headers` file and apply the security headers in production.

### Deploying to GitHub Pages
1. Push the repository to GitHub.
2. Enable **GitHub Pages** in the repository settings, using the `main` branch and the root folder.
3. GitHub Pages does not read the Netlify `_headers` file. If you need custom headers, consider using Cloudflare or another CDN in front of the site.

## Security headers

The project includes a minimal `Content‑Security‑Policy` restricting all resources to `self` and allowing scripts from `cdnjs.cloudflare.com` and `static.cloudflareinsights.com`. Adjust this policy if you add external assets.

## Prerequisites

These pages rely only on modern browsers. To deploy you need accounts on your chosen hosting platform (GitHub or Netlify) and access to DNS settings if you want to use a custom domain.
