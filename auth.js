export default {
  async fetch(req, env) {
    const url = new URL(req.url);

    /* ===============================
       CORS
    =============================== */
    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    /* ===============================
       AUTH LOGIN
    =============================== */
    if (url.pathname === "/auth/login" && req.method === "POST") {
      const { username, password } = await req.json();
      const saved = await env.AUTH_KV.get("admin_password") || "Steve123";

      if (username === "admin" && password === saved) {
        return json({ ok: true });
      }
      return json({ ok: false }, 401);
    }

    /* ===============================
       GANTI PASSWORD
    =============================== */
    if (url.pathname === "/auth/password" && req.method === "POST") {
      const { oldPass, newPass } = await req.json();
      const saved = await env.AUTH_KV.get("admin_password") || "Steve123";

      if (oldPass !== saved) {
        return json({ ok: false }, 401);
      }

      await env.AUTH_KV.put("admin_password", newPass);
      return json({ ok: true });
    }

    /* ===============================
       SCHEDULE
    =============================== */
    if (url.pathname === "/schedule" && req.method === "GET") {
      const list = await env.KV.get("schedules", { type: "json" }) || [];
      return json({ ok: true, list });
    }

    if (url.pathname === "/schedule" && req.method === "POST") {
      const data = await req.json();
      const list = await env.KV.get("schedules", { type: "json" }) || [];
      data.id = crypto.randomUUID();
      list.push(data);
      await env.KV.put("schedules", JSON.stringify(list));
      return json({ ok: true, id: data.id });
    }

    if (url.pathname.startsWith("/schedule/") && req.method === "DELETE") {
      const id = url.pathname.split("/").pop();
      let list = await env.KV.get("schedules", { type: "json" }) || [];
      list = list.filter(x => x.id !== id);
      await env.KV.put("schedules", JSON.stringify(list));
      return json({ ok: true });
    }

    /* ===============================
       STORAGE LIST
    =============================== */
    if (url.pathname === "/storage" && req.method === "GET") {
      const objects = await env.R2.list();
      return json({
        ok: true,
        list: objects.objects.map(o => ({
          key: o.key,
          size: o.size
        }))
      });
    }

    /* ===============================
       UPLOAD FILE
    =============================== */
    if (url.pathname === "/upload" && req.method === "POST") {
      const form = await req.formData();
      const file = form.get("file");
      if (!file) return json({ ok: false }, 400);

      await env.R2.put(file.name, file.stream());
      return json({ ok: true });
    }

    /* ===============================
       PUBLIC FILE
    =============================== */
    if (url.pathname.startsWith("/public/")) {
      const key = url.pathname.replace("/public/", "");
      const obj = await env.R2.get(key);
      if (!obj) return new Response("Not found", { status: 404 });
      return new Response(obj.body);
    }

    /* ===============================
       DEFAULT
    =============================== */
    return json({ ok: false, error: "Invalid route" }, 404);
  }
};

/* ===============================
   HELPER
=============================== */
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
