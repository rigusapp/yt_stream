# yt_stream Dashboard v10 — Cloudflare Worker Proxy Edition

## Alur:
Browser → Cloudflare Worker → GitHub API (dengan GH_PAT) → repository_dispatch → proxy.yml → stream.yml → FFmpeg stream.

## Cara Setup Cloudflare Worker:
1. Buka https://dash.cloudflare.com
2. Pilih Workers & Pages → Create Worker
3. Hapus semua kode default → paste isi worker.js
4. Klik Deploy
5. Masuk menu Worker → Settings → Variables
6. Tambahkan Variable:
   GH_PAT = <isi token GitHub kamu>

## Dashboard:
Isi input URL Worker seperti:
https://stream-proxy.<akun>.workers.dev

