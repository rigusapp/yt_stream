const SCHEDULER = "https://yt-scheduler-api.rigus-apps.workers.dev";
const PROXY = "https://ytstream-proxy.rigus-apps.workers.dev";

// Proteksi login
if(localStorage.getItem("auth") !== "1"){
  location.href = "index.html";
}

// Date picker
flatpickr("#inp_time",{enableTime:true,dateFormat:"d/m/Y H:i",time_24hr:true});

// Utils
function toISO_WIB(str){
  if(!str) return "";
  const [d,m,y] = str.split(" ")[0].split("/");
  const time = str.split(" ")[1];
  return `${y}-${m}-${d}T${time}:00+07:00`;
}

// Clear
btn_clear.onclick = ()=>{
  inp_title.value="";
  inp_desc.value="";
  inp_video.value="";
  inp_key.value="";
};

// Trigger live
btn_trigger.onclick = async ()=>{
  const payloadData = {
    title: inp_title.value,
    description: inp_desc.value,
    visibility: inp_vis.value,
    video_url: inp_video.value,
    stream_key: inp_key.value,
    start_time: toISO_WIB(inp_time.value),
    duration_seconds: Number(inp_dur.value),
    looping: inp_loop.checked
  };

  payload.style.display="block";
  payload.textContent = JSON.stringify(
    {...payloadData, stream_key:"*****"},
    null,2
  );

  log.style.display="block";
  log.textContent="Sending...";

  await fetch(SCHEDULER+"/schedule",{
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(payloadData)
  });

  const r = await fetch(PROXY,{
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({event_type:"stream_trigger",client_payload:payloadData})
  });

  log.textContent = "Response: "+r.status;
};

// Logout
function logout(){
  localStorage.removeItem("auth");
  location.href="index.html";
}
