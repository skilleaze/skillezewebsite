# Skilleaze website

Static site. No build step.

## Deploy on GitHub Pages
1. Push the contents of this folder to the root of a repo.
2. Settings → Pages → Source: Deploy from a branch → `main` / root.
3. Optional: add a `CNAME` file containing `skilleaze.com` and point your DNS to GitHub Pages.

`index.html` redirects to the home page. Keep `.nojekyll` so files are served as-is.

## Files
- `Skilleaze Landing v2.dc.html` home
- `Skilleaze About.dc.html` about
- `Policies.dc.html` privacy, terms, refunds
- `Service - *.dc.html`, `Portal - *.dc.html` service and portal pages (share `Service Page.dc.html`)
- `Priya Chat.dc.html`, `Testimonial Phone.dc.html` shared components
- `support.js` page runtime, `sk-fx.js` effects, `sk-sound.js` sounds
- `assets/` images and video
