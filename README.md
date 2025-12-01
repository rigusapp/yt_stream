YT Stream — v16 (Dashboard + Cloudflare Worker + GitHub Actions)
===============================================================

Struktur project ini:

- index.html                (Dashboard UI — use with static hosting)
- worker/worker.js          (Cloudflare Worker: proxy that triggers GitHub dispatch)
- .github/workflows/stream.yml  (GitHub Actions workflow that runs FFmpeg)
- .github/workflows/proxy.yml   (listener workflow to call the composite action)
- README.md

Cara pakai singkat:
1. Deploy Cloudflare Worker 'worker/worker.js', set variable GH_PAT (Plaintext)
   - Worker reads GH_PAT from Worker variables to trigger GitHub dispatch safely.
2. Serve index.html (GitHub Pages / Vercel / static host). Masukkan Worker URL.
3. Isi video, tanggal, duration, title, stream_key lalu tekan Trigger.
4. Worker meneruskan payload ke repository_dispatch. GitHub Actions akan mengeksekusi FFmpeg.

NOTE:
- This project intentionally uses stream_key passed from the dashboard (payload).
- Do not store stream_key in repo secrets if you want to change keys on the fly.
