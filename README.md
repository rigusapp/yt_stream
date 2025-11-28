
YT Stream v15 Premium - Paket lengkap

Perubahan utama:
- Dashboard premium UI + custom logo (SVG)
- Field tambahan: title, visibility, description, stream_key
- Stream key diisi di dashboard (tidak lagi disimpan di GitHub Secrets)
- Worker dan workflows menerima metadata dan stream_key and forward to runner
- NOTE: To actually set title/description/visibility in YouTube programmatically, you must add YouTube Data API OAuth credentials and a step in the workflow to call the API. This package only passes metadata to the runner for logging; stream uses provided RTMP stream key.

Setup summary:
1. Deploy worker/worker.js to Cloudflare Worker and set GH_PAT variable (classic token with repo+workflow scopes).
2. Upload `.github` folder and `index.html` to repository `rigusapp/yt_stream` on branch main.
3. Ensure Actions permissions Read & Write.
4. Use dashboard: fill fields and click "Mulai Streaming". The runner will use the stream_key you provided.
