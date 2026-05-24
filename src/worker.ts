export default {
  fetch(): Response {
    return new Response("Claude Channel Guide", {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
};
