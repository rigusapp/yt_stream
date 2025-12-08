# 🎥 YT Stream — Automated YouTube Live Streaming via Web Dashboard

YT Stream adalah aplikasi **web-based automation** untuk melakukan **live streaming YouTube secara otomatis menggunakan file video**, tanpa OBS dan tanpa VPS pribadi.

Sistem ini menggabungkan:

* ✅ Web Dashboard (HTML)
* ✅ Cloudflare Worker
* ✅ GitHub Actions
* ✅ FFmpeg
* ✅ YouTube RTMP

Dengan aplikasi ini, Anda cukup:

> Input video, stream key, jadwal → klik **Trigger Stream** → **LIVE otomatis berjalan di YouTube.**

---

## 🚀 Fitur Utama

* ✅ Live streaming YouTube otomatis dari file video
* ✅ Tanpa OBS, tanpa VPS, tanpa server pribadi
* ✅ Trigger langsung dari Web Dashboard
* ✅ Loop video nonstop (24 jam bisa)
* ✅ Aman dengan Cloudflare Worker
* ✅ GitHub Actions sebagai streaming engine
* ✅ Mendukung:

  * Judul Live
  * Deskripsi Live
  * Visibility (Public / Unlisted / Private)
* ✅ Full online & gratis (menggunakan GitHub & Cloudflare)

---

## 🏗 Arsitektur Sistem

```
Dashboard (index.html)
     ↓ POST
Cloudflare Worker (worker.js)
     ↓ repository_dispatch
GitHub Actions (stream.yml)
     ↓
FFmpeg → YouTube RTMP Server
```

---

## 📁 Struktur File

```
.
├── index.html
├── worker.js
├── README.md
└── .github/
    └── workflows/
        ├── stream.yml
        └── proxy.yml
```

---

## ✅ Persiapan Akun

Pastikan Anda sudah memiliki:

1. ✅ Akun GitHub
2. ✅ Akun Cloudflare
3. ✅ Channel YouTube yang sudah aktif Live Streaming
4. ✅ Stream Key YouTube

---

## 🔐 Membuat GitHub Personal Access Token (PAT)

1. Masuk ke **GitHub → Settings**
2. Pilih **Developer Settings**
3. Pilih **Personal Access Tokens → Tokens (Classic)**
4. Klik **Generate New Token**
5. Centang permission:

   * ✅ `repo`
   * ✅ `workflow`
6. Simpan token (TOKEN INI RAHASIA)

---

## ☁️ Deploy Cloudflare Worker

1. Login ke **Cloudflare**
2. Masuk ke menu **Workers & Pages**
3. Buat **Worker baru**
4. Paste kode dari file `worker.js`
5. Tambahkan **Environment Variable:**

| Nama     | Isi               |
| -------- | ----------------- |
| `GH_PAT` | Token GitHub Anda |

6. Klik **Deploy**
7. Simpan URL Worker Anda, contoh:

```
https://namaworker.workers.dev
```

---

## 🗂 Setup Repository GitHub

1. Buat repository baru (contoh):

```
yt_stream
```

2. Upload file berikut:

* `index.html`
* `worker.js`
* Folder `.github/workflows/`

  * `stream.yml`
  * `proxy.yml`

3. Pastikan branch utama bernama:

```
main
```

---

## 🌐 Menjalankan Dashboard

### ✅ Cara 1 — Lokal

Buka langsung file:

```
index.html
```

di browser.

### ✅ Cara 2 — Online (GitHub Pages)

1. Masuk ke **Settings → Pages**
2. Pilih branch `main`
3. Akses melalui:

```
https://username.github.io/yt_stream/
```

---

## ▶️ Cara Menggunakan Live Streaming

1. Buka Dashboard `index.html`
2. Isi form berikut:

   * ✅ Worker URL
   * ✅ Video URL
   * ✅ RTMP Server
   * ✅ Stream Key YouTube
   * ✅ Judul
   * ✅ Deskripsi
   * ✅ Visibility
3. Klik **Trigger Stream**
4. Buka GitHub:

```
GitHub → Actions → Stream to YouTube
```

5. Tunggu sampai FFmpeg berjalan
6. Live otomatis muncul di YouTube 🎥🔴

---

## 🔁 Looping 24 Jam

Sistem ini menggunakan flag FFmpeg:

```
-stream_loop -1
```

Artinya:
✅ Video akan berulang otomatis nonstop sesuai limit GitHub Runner.

---

## 🛑 Menghentikan Live

1. Masuk ke **GitHub → Actions**
2. Pilih workflow yang sedang berjalan
3. Klik **Cancel Workflow**

---

## 🔎 Debugging

### ❌ Worker 403 Forbidden

* Pastikan `GH_PAT` sudah benar
* Pastikan header `User-Agent` ada

### ❌ FFmpeg Error

* Pastikan video URL dapat diakses publik
* Pastikan stream key benar
* Pastikan RTMP server valid

---

## 🔒 Keamanan

* ✅ Stream Key tidak disimpan permanen
* ✅ Token disimpan sebagai Environment Variable
* ✅ Semua request melalui Cloudflare Worker

---

## ⚠️ Batasan Sistem

* GitHub Actions maksimal ±6 jam per run (akun gratis)
* Tidak cocok untuk live webcam realtime
* Cocok untuk video looping & siaran otomatis

---

## 🧩 Teknologi yang Digunakan

* HTML + JavaScript
* Cloudflare Workers
* GitHub Actions
* FFmpeg
* YouTube RTMP

---

## 📜 Lisensi

Bebas digunakan untuk:

* ✅ Pribadi
* ✅ Komunitas
* ✅ Komersial kecil

Tidak diperbolehkan menjual ulang source tanpa izin.

---

## 🙌 Penutup

Aplikasi ini cocok untuk:

* Radio streaming
* TV online
* Live kajian
* Live musik
* Loop video promosi
* Siaran komunitas

---

Dibuat dengan ❤️ untuk automasi livestream YouTube.
