# yt_stream Dashboard v12 (Complete)

Files:
- index.html (dashboard)
- worker/worker.js (Cloudflare Worker proxy)
- .github/actions/trigger/action.yml (composite action)
- .github/workflows/proxy.yml (repository_dispatch listener)
- .github/workflows/stream.yml (FFmpeg streaming workflow)

Instructions:
1. Deploy worker/worker.js inside your Cloudflare Worker (ytstream-proxy) and Deploy.
2. Add variable GH_PAT in Worker (value = classic GitHub PAT with repo+workflow scopes).
3. In GitHub repo rigusapp/yt_stream upload `.github` folder and index.html to root, commit to main.
4. Add repository secret `YT_STREAM_KEY` (YouTube stream key) in repo settings > Secrets and variables > Actions.
5. Ensure Actions permissions are Read & Write in repo settings.
6. Open index.html (locally or via GitHub Pages), fill form and press "Kirim ke Worker".
7. Check GitHub Actions: Proxy Listener will run, then Stream to YouTube will run and ffmpeg will stream to YouTube.

Notes:
- Worker returns GitHub's response; 204 means dispatch accepted.
- GH_PAT must be classic token with repo + workflow permissions.
- If streaming fails because of ffmpeg input error, check VIDEO_URL accessibility from runner.
