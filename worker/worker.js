export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const pathname = url.pathname.replace(/\/+$/, "") || "/";

      if (request.method === "GET" && pathname === "/streams") {
        return await listStreams(env);
      }

      if (request.method === "POST" && pathname === "/schedule") {
        const body = await request.json();
        return await createSchedule(body, env);
      }

      if (request.method === "POST" && pathname === "/delete-stream") {
        const id = url.searchParams.get("id");
        return await deleteStream(id, env);
      }

      if (request.method === "POST" && pathname === "/start") {
        const id = url.searchParams.get("id");
        return await startStream(id, env);
      }

      if (request.method === "POST" && pathname === "/stop") {
        const id = url.searchParams.get("id");
        return await stopStream(id, env);
      }

      if (request.method === "POST" && pathname === "/finish") {
        const id = url.searchParams.get("id");
        return await finishStream(id, env);
      }

      // allow OPTIONS for test / CORS
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204 });
      }

      return new Response("Not found", { status: 404 });
    } catch (err) {
      return new Response("Server error: " + err.message, { status: 500 });
    }
  }
};

function v4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

async function listStreams(env) {
  const list = await env.STREAMS.list();
  const out = [];
  for (const k of list.keys) {
    const raw = await env.STREAMS.get(k.name);
    if (!raw) continue;
    try {
      out.push(JSON.parse(raw));
    } catch (e) {}
  }
  return new Response(JSON.stringify(out), { headers: { "Content-Type": "application/json" } });
}

async function createSchedule(body, env) {
  const { title, start_time, video_url, rtmp_url, duration_seconds, visibility, stream_key, looping } = body || {};
  if (!title || !start_time || !video_url) {
    return new Response("Field title, start_time, video_url wajib.", { status: 400 });
  }
  const id = v4();
  const obj = {
    id,
    title,
    datetime: start_time,
    source: video_url,
    rtmp: rtmp_url,
    duration: Number(duration_seconds),
    visibility: visibility || 'public',
    stream_key: stream_key || '',
    looping: !!looping,
    status: "queued",
    createdAt: new Date().toISOString()
  };
  await env.STREAMS.put(id, JSON.stringify(obj));
  return new Response(JSON.stringify(obj), { headers: { "Content-Type": "application/json" } });
}

async function deleteStream(id, env) {
  if (!id) return new Response("Parameter id diperlukan", { status: 400 });
  await env.STREAMS.delete(id);
  await env.STREAM_STATUS.delete(id);
  return new Response("Deleted");
}

async function startStream(id, env) {
  if (!id) return new Response("Parameter id diperlukan", { status: 400 });
  const raw = await env.STREAMS.get(id);
  if (!raw) return new Response("Stream tidak ditemukan", { status: 404 });
  const obj = JSON.parse(raw);
  obj.status = "running";
  obj.startedAt = new Date().toISOString();
  await env.STREAMS.put(id, JSON.stringify(obj));
  await env.STREAM_STATUS.delete(id);
  return new Response("Streaming dimulai (status updated).");
}

async function stopStream(id, env) {
  // Stop can be called without id; we'll mark all RUNNING streams as stopped if id not provided
  if (!id) {
    // list keys and mark running ones
    const list = await env.STREAMS.list();
    for (const k of list.keys) {
      const raw = await env.STREAMS.get(k.name);
      if (!raw) continue;
      try {
        const obj = JSON.parse(raw);
        if (obj.status === "running" || obj.status === "queued") {
          obj.status = "stopped";
          obj.stoppedAt = new Date().toISOString();
          await env.STREAMS.put(k.name, JSON.stringify(obj));
          await env.STREAM_STATUS.put(k.name, "STOP");
        }
      } catch(e){}
    }
    return new Response("All running/queued streams marked as stopped.");
  }

  const raw = await env.STREAMS.get(id);
  if (!raw) return new Response("Stream tidak ditemukan", { status: 404 });
  const obj = JSON.parse(raw);
  obj.status = "stopped";
  obj.stoppedAt = new Date().toISOString();
  await env.STREAMS.put(id, JSON.stringify(obj));
  await env.STREAM_STATUS.put(id, "STOP");
  return new Response("Streaming dihentikan.");
}

async function finishStream(id, env) {
  if (!id) return new Response("Parameter id diperlukan", { status: 400 });
  const raw = await env.STREAMS.get(id);
  if (!raw) return new Response("Stream tidak ditemukan", { status: 404 });
  const obj = JSON.parse(raw);
  obj.status = "done";
  obj.finishedAt = new Date().toISOString();
  await env.STREAMS.put(id, JSON.stringify(obj));

  if (obj.looping) {
    const now = new Date();
    const next = new Date(now.getTime() + (Number(obj.duration||0) * 60000));
    obj.datetime = next.toISOString();
    obj.status = "queued";
    delete obj.startedAt; delete obj.finishedAt;
    await env.STREAMS.put(id, JSON.stringify(obj));
    return new Response("Finished and rescheduled (looping).");
  }

  return new Response("Finished.");
}
