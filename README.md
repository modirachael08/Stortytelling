# Hormone Story Demo (Client-side)

This repository contains a tiny single-page demo that re-phrases a short story toward different "hormone" styles (oxytocin, dopamine, adrenaline, serotonin, endorphin). It runs entirely in the browser — no external services or installs required — so it's easy to showcase on GitHub Pages.

How to publish
1. Create a new repository on GitHub and upload these files (index.html, script.js, styles.css, README.md).
2. Commit to `main`.
3. Go to Settings → Pages, choose Branch `main` and Folder `/` (root), Save.
4. After a minute the page will be live at:
   `https://<your-username>.github.io/<repo-name>/`

Limitations
- This demo uses simple heuristics (JS string rules) to illustrate phrasing ideas. It's not a replacement for an LLM in quality or fidelity.
- It tries to preserve the core facts and refuses obvious self-harm content, but it cannot guarantee perfect factual preservation for all inputs.
- For production / better fidelity, integrate an LLM backend and a moderation pipeline (I can help set that up securely).

Want help?
- I can generate the full repository for you (ZIP-ready) or write a GitHub Actions workflow that will deploy to Pages automatically.
- I can also convert this to an LLM-backed demo with a simple secure backend and a free-tier deployment if you'd like to demonstrate higher-quality outputs.

Email / contact / next step
Tell me if you want:
- I create the repo contents into a ZIP you can upload.
- Step-by-step screenshots for adding files via GitHub web UI.
- A follow-up where I add a secure backend (OpenAI or other LLM) and show how to store API keys safely.
