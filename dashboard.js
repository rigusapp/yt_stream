// ====== CONFIG ======
const WORKER_URL = "https://YOUR-WORKER.workers.dev";

// ====== AUTH CHECK ======
if (localStorage.getItem("auth") !== "1") {
  location.href = "index.html";
}

// ====== START LIVE ======
async function startLive(){
  const payload = {
    title: document.getElementById("title").value,
    video_url: document.getElementById("video_url").value,
    stream_key: document.getElementById("stream_key").value,
    duration_seconds: Number(document.getElementById("duration").value),
    created_at: new Date().toISOString()
  };

  if(!payload.video_url || !payload.stream_key){
    alert("Video URL & Stream Key wajib diisi");
    return;
  }

  const res = await fetch(WORKER_URL + "/add", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify(payload)
  });

  const json = await res.json();
  alert("Live dikirim ke Worker");
  loadList();
}

// ====== LOAD LIST ======
async function loadList(){
  const res = await fetch(WORKER_URL + "/list");
  const data = await res.json();

  const tbody = document.getElementById("list");
  tbody.innerHTML = "";

  data.forEach(item=>{
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${item.title || "-"}</td>
      <td>${Math.round(item.duration_seconds/3600)} jam</td>
      <td>
        <button class="danger" onclick="hapus('${item.id}')">Hapus</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// ====== DELETE ======
async function hapus(id){
  if(!confirm("Hapus live ini?")) return;

  await fetch(WORKER_URL + "/delete/" + id, {
    method:"DELETE"
  });

  loadList();
}

// ====== LOGOUT ======
function logout(){
  localStorage.removeItem("auth");
  location.href = "index.html";
}

loadList();
