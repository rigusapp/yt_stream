function login() {
  const u = document.getElementById("u").value;
  const p = document.getElementById("p").value;

  if (!u || !p) {
    document.getElementById("err").innerText = "Isi username dan password";
    return;
  }

  // LOGIN SEDERHANA (TESTING)
  if (u === "admin" && p === "Steve123") {
    localStorage.setItem("auth", "1");
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("err").innerText = "Username atau password salah";
  }
}

