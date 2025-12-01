export default {
 async fetch(req, env){
  const url=new URL(req.url);
  const p=url.pathname;
  if(p==="/streams" && req.method==="GET") return list(env);
  if(p==="/schedule" && req.method==="POST") return schedule(req,env);
  if(p==="/delete-stream" && req.method==="POST") return del(url,env);
  if(p==="/start" && req.method==="POST") return start(url,env);
  if(p==="/stop" && req.method==="POST") return stop(url,env);
  if(p==="/finish" && req.method==="POST") return finish(url,env);
  return new Response("Not found",{status:404});
 }};

function uuid(){
 return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,c=>{
  const r=Math.random()*16|0,v=c==="x"?r:(r&0x3|0x8);return v.toString(16);
 });
}

async function list(env){
 const keys=await env.STREAMS.list(); let arr=[];
 for(const k of keys.keys){
  let raw=await env.STREAMS.get(k.name); if(raw) arr.push(JSON.parse(raw));
 }
 return json(arr);
}

async function schedule(req,env){
 const b=await req.json();
 if(!b.title||!b.datetime||!b.source) return txt("Missing",400);
 const id=uuid();
 const obj={id,...b,status:"queued",createdAt:new Date().toISOString()};
 await env.STREAMS.put(id,JSON.stringify(obj));
 return json(obj);
}

async function del(url,env){
 const id=url.searchParams.get("id");
 await env.STREAMS.delete(id);
 await env.STREAM_STATUS.delete(id);
 return txt("Deleted");
}

async function start(url,env){
 const id=url.searchParams.get("id");
 let raw=await env.STREAMS.get(id); if(!raw) return txt("Not found",404);
 let o=JSON.parse(raw); o.status="running"; o.startedAt=new Date().toISOString();
 await env.STREAMS.put(id,JSON.stringify(o));
 await env.STREAM_STATUS.delete(id);
 return txt("Started");
}

async function stop(url,env){
 const id=url.searchParams.get("id");
 let raw=await env.STREAMS.get(id); if(!raw) return txt("Not found",404);
 let o=JSON.parse(raw); o.status="stopped"; o.stoppedAt=new Date().toISOString();
 await env.STREAMS.put(id,JSON.stringify(o));
 await env.STREAM_STATUS.put(id,"STOP");
 return txt("Stopped");
}

async function finish(url,env){
 const id=url.searchParams.get("id");
 let raw=await env.STREAMS.get(id); if(!raw) return txt("Not found",404);
 let o=JSON.parse(raw);
 o.status="done"; o.finishedAt=new Date().toISOString();
 await env.STREAMS.put(id,JSON.stringify(o));
 if(o.looping){
  const next=new Date(Date.now()+o.duration*60000).toISOString();
  o.datetime=next; o.status="queued";
  delete o.startedAt; delete o.finishedAt;
  await env.STREAMS.put(id,JSON.stringify(o));
 }
 return txt("Finished");
}

function json(obj){return new Response(JSON.stringify(obj),{"headers":{"Content-Type":"application/json"}});}
function txt(t,s=200){return new Response(t,{status:s});}
