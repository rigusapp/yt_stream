# yt_stream Dashboard v8 — Proxy GH_PAT Secure Edition

How to use:
1. Upload these files to your repository root.
2. Create repository Secrets:
   - `GH_PAT` : a Personal Access Token with scopes `repo` (if needed) and `workflow`
   - `YT_STREAM_KEY` : YouTube stream key
3. Ensure your repository is **public**.
4. Open `index.html` (via GitHub Pages or raw) and fill repo, video url, date/time (WIB), duration, seamless option.
5. Click "Trigger Stream (via Proxy)". The dashboard will call the `proxy.yml` workflow (no PAT needed in browser).
6. `proxy.yml` will run a composite action that uses `GH_PAT` (from Secrets) to dispatch `stream.yml` which runs ffmpeg on a GitHub Actions runner.

Security:
- GH_PAT never exposed to browser; it's stored as a GitHub Actions secret.
- Dashboard does not include any token or secret.

Notes:
- For private repos a different approach is needed; this flow assumes a public repo.
