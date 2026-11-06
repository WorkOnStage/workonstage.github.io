# WorkOnStage website

A responsive, zero-build static website for **WorkOnStage**, intended for the GitHub Pages user site **https://workonstage.github.io/**.

## Publish on GitHub Pages

1. Sign in as the GitHub account **`workonstage`**. Create a **public** repository named **`workonstage.github.io`** (exact spelling).
2. Upload **all files and folders from the root of this package** to the repository root on the `main` branch. Include the hidden `.github` folder, `.nojekyll`, and workflow file.
3. In repository **Settings → Pages**, under **Build and deployment → Source**, choose **GitHub Actions**.
4. Open the **Actions** tab. The workflow **Deploy WorkOnStage to GitHub Pages** runs on pushes to `main` and supports manual **Run workflow**.
5. Visit **https://workonstage.github.io/** once the workflow succeeds. If the repository name differs from `workonstage.github.io`, the site URL and absolute SEO URLs in `index.html`, `robots.txt`, and `sitemap.xml` need updating.

The workflow lives at `.github/workflows/deploy.yml`, uses official GitHub Pages actions, and does **not** require a Personal Access Token, npm, or a build system.

## Before launch

- Review the wording and branding.
- Enable **Issues** in Settings → General → Features if you want the **Suggest a guest** button to work. It opens a **public** GitHub issue template; visitors need a GitHub account and should not share private information. For private submissions, replace that link with a form service or your own contact method.
- Update the GitHub URL in `index.html` if the repository owner is not `workonstage`.
- The episode section intentionally begins with a **Coming soon** state. No guests, episode dates, or videos have been invented.
- Google Fonts are loaded from an external CDN; the site falls back to installed sans-serif fonts if offline.

## Add episodes

Edit `data/episodes.json`. Start with an array of objects, like this **illustrative example** (not a published episode):

```json
[
  {
    "number": "01",
    "title": "How do we design better batteries?",
    "guest": "Example Guest",
    "field": "Materials Science",
    "description": "A short introduction to battery research and the questions that drive it.",
    "url": "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
  }
]
```

Replace all example details with verified episode information before publishing. Valid episodes appear automatically as cards linking to the video; leaving the list empty preserves the coming-soon section. There is no content management backend.

## Files

- `index.html` — complete homepage and page metadata
- `assets/styles.css` — responsive visual design
- `assets/main.js` — mobile menu and episode rendering
- `data/episodes.json` — published episode list (initially empty)
- `assets/favicon.svg`, `assets/apple-touch-icon.png` — identity assets
- `assets/social-preview.png` — preview for sharing links
- `404.html`, `robots.txt`, `sitemap.xml`, `.nojekyll` — site utilities
- `.github/workflows/deploy.yml` — automated GitHub Pages deployment
- `.github/ISSUE_TEMPLATE/guest-suggestion.yml` — public guest suggestions

## Local preview

A simple local HTTP server works; don't open `index.html` as `file://` because episode JSON loading uses `fetch`.

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Customizing

All text is in `index.html`, CSS color tokens are at the top of `assets/styles.css`, and the hero artwork is editable inline SVG in `index.html`. No compilation is needed.
