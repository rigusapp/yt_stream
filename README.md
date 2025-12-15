# 📺 YT Stream Scheduler — Full Online (GitHub Pages + Cloudflare Worker + GitHub Actions + Replit)

Aplikasi **livestream YouTube full online** yang berjalan tanpa VPS tradisional.
Project ini menggabungkan **GitHub Pages**, **Cloudflare Worker**, **GitHub Actions**, dan **Replit** untuk menjalankan **streaming video ke YouTube via RTMP**, termasuk **penjadwalan dan looping video**.

⚠️ Project ini ditujukan untuk **penggunaan pribadi / internal**, bukan sistem publik skala besar.

---

## 🎯 Tujuan Project
- Menjalankan livestream YouTube **tanpa server sendiri**
- Mengatur live **secara online**
- Menyimpan video di cloud
- Menjalankan stream **otomatis via GitHub Actions**
- Semua komponen bisa dijalankan **gratis (dengan batasan)**

---

## 🧱 Arsitektur Sistem
Browser (GitHub Pages)  
→ Cloudflare Worker (API & Proxy)  
→ GitHub Actions  
→ Replit (FFmpeg)  
→ YouTube RTMP

---

## 🧰 Teknologi
- Frontend: HTML, CSS, JavaScript, Flatpickr
- Hosting: GitHub Pages
- Backend: Cloudflare Worker, KV, R2
- Automation: GitHub Actions
- Streaming: Replit + FFmpeg + YouTube RTMP

---

## 🔐 Login
- Mode: Single User
- Username: admin
- Password default: Steve123
- Password dapat diubah di menu Pengaturan
- Login berbasis localStorage (client-side)

---

## 📁 Struktur File
index.html  
dashboard.html  
penyimpanan.html  
jadwal.html  
monitoring.html  
pengaturan.html  
auth.js  
README.md  

---

## ⚠️ Catatan YouTube
- Judul, deskripsi, dan visibilitas **tidak otomatis berubah**
- RTMP **tidak bisa mengubah metadata**
- Metadata harus diatur manual di YouTube Studio

---

## 📝 Penutup
Project ini membuktikan bahwa livestream YouTube dapat dijalankan **100% online tanpa VPS**, menggunakan kombinasi layanan gratis.
