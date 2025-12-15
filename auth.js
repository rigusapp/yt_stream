addEventListener("fetch", event => {
  event.respondWith(
    new Response("WORKER AKTIF", {
      headers: { "Content-Type": "text/plain" }
    })
  );
});
