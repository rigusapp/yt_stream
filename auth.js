// ===============================
// AUTH GUARD (GLOBAL)
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

  if (protectedPages.includes(current)) {
    if (localStorage.getItem("auth") !== "1") {
      location.href = "index.html";
    }
  }

  // Jika sudah login, jangan tampilkan login page lagi
  if (current === "" || current === "index.html") {
    if (localStorage.getItem("auth") === "1") {
      location.href = "dashboard.html";
    }
  }
})();

// ===============================
// LOGIN
// ===============================
function login() {
  const u = document.getElementById("u")?.value || "";
  const p = document.getElementById("p")?.value || "";

  if (!u || !p) {
    const err = document.getElementById("err");
    if (err) err.textContent = "Username dan password wajib diisi";
    return;
  }

  // LOGIN SEMENTARA (STATIS)
  if (u === "admin" && p === "Steve123") {
    localStorage.setItem("auth", "1");
    location.href = "dashboard.html";
  } else {
    const err = document.getElementById("err");
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
