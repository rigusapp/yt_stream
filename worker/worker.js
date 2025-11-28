export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null,{status:204,headers:{
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Headers":"*",
        "Access-Control-Allow-Methods":"POST, OPTIONS"
      }});
    }
    if(request.method!=="POST"){
      return new Response("Worker OK",{status:200,headers:{"Access-Control-Allow-Origin":"*"}});
    }
    let data;
    try{data=await request.json();}catch(e){
      return new Response("Bad JSON",{status:400,headers:{"Access-Control-Allow-Origin":"*"}});
    }
    const payload={
      event_type:"stream_trigger",
      client_payload:{
        title:data.title||"",
        visibility:data.visibility||"",
        description:data.description||"",
        stream_key:data.stream_key||"",
        video_url:data.video_url||"",
        start_time:data.start_time||"",
        duration_seconds:data.duration_seconds||"",
        seamless:data.seamless||"false"
      }
    };
    const r=await fetch(`https://api.github.com/repos/${data.repo}/dispatches`,{
      method:"POST",
      headers:{
        "Authorization":"token "+env.GH_PAT,
        "Content-Type":"application/json"
      },
      body:JSON.stringify(payload)
    });
    return new Response(await r.text(),{status:r.status,headers:{"Access-Control-Allow-Origin":"*"}});
  }
};
