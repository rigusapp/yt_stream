
function login(){
    const u = document.getElementById("u").value.trim();
    const p = document.getElementById("p").value.trim();
    if(u === "buanamedia" && p === "Agus12066911"){
        localStorage.setItem("auth_token","OK");
        location.href = "index.html";
    } else {
        document.getElementById("err").textContent = "Username atau password salah.";
    }
}

function logout(){
    localStorage.removeItem("auth_token");
    location.href = "login.html";
}

if (location.pathname.includes(".html") && 
    !location.pathname.includes("login.html")) {
    if(!localStorage.getItem("auth_token")){
        location.href = "login.html";
    }
}
