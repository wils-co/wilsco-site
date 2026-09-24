/**
 * Cloudflare Worker: progress-proxy
 * Route: wilsco.au/*  (takes precedence over the landing Worker's custom domain)
 *
 * Artifact paths → Vercel (wilsco-site). Smiles by Design / Thailand27 →
 * their Vercel origins (prefix stripped). Everything else → landing
 * Worker via fetch() to the custom domain (does not loop).
 *
 * New proof page: add files in the site repo and push. If it's a new
 * top-level path, add it to PREFIXES and redeploy this Worker.
 */
const PREFIXES = [
  "/progress",
  "/trade",
  "/notes",
  "/work",
  "/about",
  "/llms.txt",
];

const SMILES_PREFIX = "/smilesbydesign";
const SMILES_ORIGIN = "https://jaws-dental-practice.vercel.app";

const THAILAND27_PREFIX = "/thailand27";
const THAILAND27_ORIGIN = "https://thailand27.vercel.app";

function isArtifact(pathname) {
  return PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

function isSmiles(pathname) {
  return pathname === SMILES_PREFIX || pathname.startsWith(SMILES_PREFIX + "/");
}

function isThailand27(pathname) {
  return pathname === THAILAND27_PREFIX || pathname.startsWith(THAILAND27_PREFIX + "/");
}

function proxyStripped(request, incoming, prefix, origin) {
  if (incoming.pathname === prefix) {
    const slash = new URL(prefix + "/" + incoming.search, incoming);
    return Response.redirect(slash, 301);
  }
  const stripped = incoming.pathname.slice(prefix.length) || "/";
  const outgoing = new URL(stripped + incoming.search, origin);
  return fetch(outgoing, {
    method: request.method,
    headers: request.headers,
    redirect: "follow",
  });
}

export default {
  async fetch(request) {
    const incoming = new URL(request.url);

    if (isSmiles(incoming.pathname)) {
      return proxyStripped(request, incoming, SMILES_PREFIX, SMILES_ORIGIN);
    }

    if (isThailand27(incoming.pathname)) {
      return proxyStripped(request, incoming, THAILAND27_PREFIX, THAILAND27_ORIGIN);
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
