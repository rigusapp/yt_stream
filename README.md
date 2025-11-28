# yt_stream Dashboard v11 — Cloudflare Worker (User-Agent + CORS)

This package contains:
- index.html (client UI)
- worker/worker.js (Cloudflare Worker proxy with User-Agent + CORS)
- .github/workflows/proxy.yml (listener)
- .github/workflows/stream.yml (ffmpeg stream)
- .github/actions/trigger/action.yml (composite dispatch)

Install:
1. Deploy worker/worker.js to your Cloudflare Worker (or paste into your current worker and Deploy).
2. Add GH_PAT as a Worker secret/variable (env name GH_PAT).
3. Upload the `.github` folder and index.html to your GitHub repo (rigusapp/yt_stream).
4. Ensure repo is public, add repo secret YT_STREAM_KEY, and add GH_PAT to repo secrets as well (used by composite action).
5. Open index.html (via GitHub Pages or local) and set Worker URL (default prefilled).
6. Trigger stream from dashboard.

Notes:
- Worker now sends User-Agent and accepts CORS; this fixes 403 and 401 issues.
- GH_PAT must be a token with workflow permissions (classic token recommended).
