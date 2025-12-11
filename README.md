# 📘 YT Stream — Automated YouTube Live Streaming

YT Stream adalah aplikasi **live streaming YouTube otomatis** berbasis:

- Dashboard Web
- Cloudflare Worker
- GitHub Actions (FFmpeg)
- YouTube RTMP + Stream Key

Tanpa OBS.
Tanpa VPS.
Tanpa server pribadi.
Full online gratis dan otomatis.

## 🚀 Fitur Utama
- Streaming otomatis ke YouTube dari URL video
- Penjadwalan (tanggal & jam format WIB)
- Durasi live hingga 12 jam
- Loop video otomatis
- RTMP server default
- Cloudflare Worker URL default
- Dashboard profesional & ringan

## 🏗 Arsitektur Sistem
Dashboard → Cloudflare Worker → GitHub Actions → FFmpeg → YouTube Live

## 📂 Struktur Proyek
index.html  
worker.js  
.github/workflows/  
README.md

## Deploy Cloudflare Worker
Tambahkan GH_PAT ke environment worker lalu deploy.

## Penggunaan
Isi form di dashboard → klik Trigger Stream → GitHub Actions melakukan streaming otomatis.

## Troubleshooting
- 403/401 → Token salah atau GH_PAT tidak di-set
- FFmpeg error → Video URL tidak publik
- Live berhenti → Limit GitHub Actions

## Cocok Untuk
Radio online, TV digital, ibadah, komunitas, promo 24 jam, loop panjang.
