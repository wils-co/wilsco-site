/**
 * Cloudflare Worker: progress-proxy
 * Route: wilsco.au/*  (takes precedence over the landing Worker's custom domain)
 *
 * Artifact paths → Vercel (wilsco-site). Smiles by Design placeholder →
 * jaws-dental-practice Vercel (prefix stripped). Everything else → landing
 * Worker via fetch() to the custom domain (does not loop).
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

const SMILES_PREFIX = "/smilesbydesign";
const SMILES_ORIGIN = "https://jaws-dental-practice.vercel.app";

function isArtifact(pathname) {
  return PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

function isSmiles(pathname) {
  return pathname === SMILES_PREFIX || pathname.startsWith(SMILES_PREFIX + "/");
}

export default {
  async fetch(request) {
    const incoming = new URL(request.url);

    // Placeholder practice site: strip /smilesbydesign so relative links work.
    if (isSmiles(incoming.pathname)) {
      if (incoming.pathname === SMILES_PREFIX) {
        const slash = new URL(SMILES_PREFIX + "/" + incoming.search, incoming);
        return Response.redirect(slash, 301);
      }
      const stripped =
        incoming.pathname.slice(SMILES_PREFIX.length) || "/";
      const outgoing = new URL(stripped + incoming.search, SMILES_ORIGIN);
      return fetch(outgoing, {
        method: request.method,
        headers: request.headers,
        redirect: "follow",
      });
    }

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
