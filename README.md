# derechoya.co

Static landing page for the guide «Cómo hacer una tutela y ganarla» (Colombia, 2026). The call to action is WhatsApp **+57 320 470 1302**.

- Plain HTML and CSS, no build step. The whole site is the files in the root: `index.html`, `styles.css`, `favicon.svg`, `og.svg`, `robots.txt`, `sitemap.xml` and `_headers` (security headers for Cloudflare).
- Design based on the book's cover: navy gradient, gold accents, white title and a shield with a cross and a check.
- Hosting: Cloudflare, domain `derechoya.co`. Every push to `main` is deployed automatically (no pull requests, no other branches).
- To preview locally: `python3 -m http.server 8765` and open <http://localhost:8765>.
- Publish: run `scripts/publish.sh` (push to `main` plus a deployment request). The site is live at <https://derechoya.co> (`http` and `www` redirect to it, done by the edge Worker).
- Domain: `edge/` is a tiny Cloudflare Worker (`derechoya-edge`) that serves both domains from the Pages project; it was needed because the Wrangler login cannot create DNS records, and a Worker custom domain creates its own. It never changes. If the two CNAME records `@` and `www` → `derechoya.pages.dev` are added in the Cloudflare DNS page, the Worker can be deleted.
- Deployment: the Cloudflare Pages project `derechoya` serves this repository. The GitHub Actions workflow `.github/workflows/deploy.yml` calls a Pages deploy hook on every push to `main`, because Cloudflare's own GitHub push webhook did not fire for this repository (the Cloudflare GitHub app probably has no access to it; granting it in GitHub → Settings → Applications would make the workflow unnecessary).
