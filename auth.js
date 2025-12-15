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
// LOGIN (SINGLE USER)
// ===============================
async function login(){
  const u = document.getElementById("u").value;
  const p = document.getElementById("p").value;
  const err = document.getElementById("err");

  if(!u || !p){
    err.textContent = "Username dan password wajib diisi";
    return;
  }

  const r = await fetch(
    "https://yt-scheduler-api.rigus-apps.workers.dev/auth/login",
    {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({ username:u, password:p })
    }
  );

  if(!r.ok){
    err.textContent = "Username atau password salah";
    return;
  }

  localStorage.setItem("auth","1");
  location.href = "dashboard.html";
}



// ===============================
// LOGOUT
// ===============================
function logout() {
  if (!confirm("Logout dari dashboard?")) return;
  localStorage.removeItem("auth");
  location.href = "index.html";
}
