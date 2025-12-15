addEventListener("fetch", event => {
  event.respondWith(handle(event.request));
});

async function handle(req) {
  const url = new URL(req.url);

  // ===============================
  // CORS
  // ===============================
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }

  // ===============================
  // AUTH LOGIN
  // ===============================
  if (url.pathname === "/auth/login" && req.method === "POST") {
    const { username, password } = await req.json();
    const saved =
      (await AUTH_KV.get("admin_password")) || "Steve123";

    if (username === "admin" && password === saved) {
      return json({ ok: true });
    }
    return json({ ok: false }, 401);
  }

  // ===============================
  // CHANGE PASSWORD
  // ===============================
  if (url.pathname === "/auth/password" && req.method === "POST") {
    const { oldPass, newPass } = await req.json();
    const saved =
      (await AUTH_KV.get("admin_password")) || "Steve123";

    if (oldPass !== saved) {
      return json({ ok: false }, 401);
    }

    await AUTH_KV.put("admin_password", newPass);
    return json({ ok: true });
  }

  // ===============================
  // DEFAULT
  // ===============================
  return json({ ok: false, error: "Invalid route" }, 404);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
