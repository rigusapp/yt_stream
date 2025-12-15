// ===============================
// AUTH GUARD
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

  if (current === "" || current === "index.html") {
    if (localStorage.getItem("auth") === "1") {
      location.href = "dashboard.html";
    }
  }
})();

// ===============================
// LOGIN (PAKAI WORKER)
// ===============================
async function login() {
  const u = document.getElementById("u").value.trim();
  const p = document.getElementById("p").value.trim();
  const err = document.getElementById("err");

  err.textContent = "";

  if (!u || !p) {
    err.textContent = "Username dan password wajib diisi";
    return;
  }

  try {
    const r = await fetch(
      "https://yt-scheduler-api.rigus-apps.workers.dev/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: u, password: p })
      }
    );

    const j = await r.json();

    if (j.ok) {
      localStorage.setItem("auth", "1");
      location.href = "dashboard.html";
    } else {
      err.textContent = "Username atau password salah";
    }
  } catch (e) {
    err.textContent = "Gagal terhubung ke server";
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
