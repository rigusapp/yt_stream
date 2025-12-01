
YT Stream v17 Premium - Professional SaaS style

What's included:
- index.html (premium professional UI)
- worker/worker.js (Cloudflare Worker proxy; set GH_PAT variable)
- .github/workflows/stream.yml (prints payload and runs ffmpeg using rtmp_url + stream_key)
- .github/workflows/proxy.yml (listener dispatch)
- README instructions

Deploy steps:
1. Deploy worker/worker.js to Cloudflare Workers and set variable GH_PAT with a classic GitHub PAT (repo + workflow scopes).
2. Upload .github folder and index.html to repo rigusapp/yt_stream (branch main).
3. Open index.html (hosted or local), fill fields including worker URL and stream key, then click Trigger Stream.
4. Check Actions -> Stream to YouTube to see payload and ffmpeg logs.
