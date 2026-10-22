// Serves derechoya.co and www.derechoya.co from the Cloudflare Pages project.
// It never changes: the site itself is deployed by Pages on every push to main.
const ORIGIN = "https://derechoya.pages.dev";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    // One canonical address: https and no "www".
    if (url.protocol === "http:" || url.hostname === "www.derechoya.co") {
      url.protocol = "https:";
      url.hostname = "derechoya.co";
      return Response.redirect(url.toString(), 301);
    }
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405 });
    }
    return fetch(ORIGIN + url.pathname + url.search, {
      method: request.method,
      cf: { cacheTtl: 60, cacheEverything: true },
    });
  },
};
