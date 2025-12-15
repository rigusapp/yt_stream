// ===============================
// AUTH GUARD (CLIENT SIDE)
// ===============================
(function () {
  const protectedPages = [
    "dashboard.html",
    "jadwal.html",
    "monitoring.html",
    "penyimpanan.html",
    "pengaturan.html"
  ];

  const current = location.pathname.split("/").pop();

  // Proteksi halaman dashboard
  if (protectedPages.includes(current)) {
    if (localStorage.getItem("auth") !== "1") {
      location.href = "index.html";
    }
  }

  // Jika sudah login, jangan kembali ke login page
  if (current === "" || current === "index.html") {
    if (localStorage.getItem("auth") === "1") {
      location.href = "dashboard.html";
    }
  }
})();

// ===============================
// LOGIN (STATIS / OFFLINE)
// ===============================
function login() {
  const u = document.getElementById("u")?.value || "";
  const p = document.getElementById("p")?.value || "";
  const err = document.getElementById("err");

  if (!u || !p) {
    if (err) err.textContent = "Username dan password wajib diisi";
    return;
  }

  // LOGIN DEFAULT (SEBELUM SINKRON)
  if (u === "admin" && p === "Steve123") {
    localStorage.setItem("auth", "1");
    location.href = "dashboard.html";
  } else {
    if (err) err.textContent = "Username atau password salah";
  }
}

// ===============================
// LOGOUT
// ===============================
function logout() {
  if (!confirm("Logout dari dashboard?")) return;
  localStorage.removeItem("auth");
  location.href = "index.html";
}
