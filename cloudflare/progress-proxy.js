/**
 * Cloudflare Worker: progress-proxy
 * Route: wilsco.au/*  (takes precedence over the landing Worker's custom domain)
 *
 * Artifact paths → Vercel (wilsco-site). Everything else → landing Worker
 * via fetch() to the custom domain (does not loop).
 *
 * New proof page: add files in the site repo and push. If it's a new
 * top-level path, add it to PREFIXES and redeploy this Worker.
 */
const PREFIXES = [
  "/progress",
  "/notes",
  "/work",
  "/about",
  "/llms.txt",
];

function isArtifact(pathname) {
  return PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

export default {
  async fetch(request) {
    const incoming = new URL(request.url);

    if (isArtifact(incoming.pathname)) {
      const outgoing = new URL(
        incoming.pathname + incoming.search,
        "https://wilsco-site.vercel.app"
      );
      return fetch(outgoing, {
        method: request.method,
        headers: request.headers,
        redirect: "follow",
      });
    }

    // Landing + DC hashed assets stay on lucky-dream-f263.
    return fetch(request);
  },
};
