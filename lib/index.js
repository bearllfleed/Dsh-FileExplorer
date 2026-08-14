// @in-sight dsh-plugin-file-explorer — host half
// Serves three loopback routes for the browser file explorer:
//   /plugin/file-explorer/list  -> one directory level (dirs + files)
//   /plugin/file-explorer/read  -> text file content (JSON)
//   /plugin/file-explorer/raw   -> raw bytes (image/binary preview)
// Paths are validated against the host cwd and every registered workspace path.

import { promises as fs } from "node:fs";
import path from "node:path";

const MAX_READ_BYTES = 512 * 1024; // text preview cap
const MAX_RAW_BYTES = 8 * 1024 * 1024; // image/binary preview cap
const MAX_LIST_ENTRIES = 4000; // per-directory entry cap

const TEXT_EXTENSIONS = new Set([
  "", ".txt", ".md", ".markdown", ".mdown", ".mdx", ".rst", ".org",
  ".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx", ".mts", ".cts",
  ".json", ".jsonc", ".json5", ".yaml", ".yml", ".toml", ".ini", ".cfg", ".conf", ".env",
  ".css", ".scss", ".sass", ".less", ".html", ".htm", ".xml", ".svg",
  ".sh", ".bash", ".zsh", ".fish", ".ps1", ".py", ".rb", ".go", ".rs", ".php",
  ".java", ".kt", ".kts", ".c", ".h", ".cpp", ".hpp", ".cc", ".cs", ".swift",
  ".sql", ".graphql", ".gql", ".proto", ".vue", ".svelte", ".astro", ".sol",
  ".csv", ".tsv", ".log", ".diff", ".patch", ".map", ".lock", ".license",
  ".gitignore", ".gitattributes", ".editorconfig", ".dockerignore", ".npmrc",
  ".makefile", ".cmake", ".properties", ".plist"
]);

const RAW_MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".bmp": "image/bmp",
  ".avif": "image/avif",
  ".pdf": "application/pdf"
};

function workspacePaths(ctx) {
  const out = [];
  try {
    const reg = ctx.workspaceRegistry;
    const list = reg && typeof reg.list === "function" ? reg.list() : [];
    if (Array.isArray(list)) {
      for (const w of list) {
        const p = w && typeof w.path === "string" ? w.path : "";
        if (p) out.push(p);
      }
    }
  } catch {
    /* registry optional/absent */
  }
  return out;
}

async function realpathSafe(p) {
  try {
    return await fs.realpath(p);
  } catch {
    return null;
  }
}

async function allowedRoots(ctx) {
  const roots = new Set();
  const cwd = await realpathSafe(process.cwd());
  if (cwd) roots.add(cwd);
  for (const p of workspacePaths(ctx)) {
    const r = await realpathSafe(p);
    if (r) roots.add(r);
  }
  return [...roots];
}

function isContained(real, root) {
  const rel = path.relative(root, real);
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}

async function resolveAllowed(ctx, requested) {
  if (typeof requested !== "string" || requested === "") return null;
  const abs = path.resolve(requested);
  const real = await realpathSafe(abs);
  if (!real) return null;
  const roots = await allowedRoots(ctx);
  for (const root of roots) {
    if (isContained(real, root)) return real;
  }
  return null;
}

/**
 * Resolve a WRITE target: an existing file must already sit inside an allowed
 * root; a not-yet-existing file is allowed when its parent directory does.
 */
async function resolveWriteTarget(ctx, requested) {
  if (typeof requested !== "string" || requested === "") return null;
  const abs = path.resolve(requested);
  const existing = await realpathSafe(abs);
  const roots = await allowedRoots(ctx);
  if (existing) {
    for (const root of roots) {
      if (isContained(existing, root)) return existing;
    }
    return null;
  }
  const realParent = await realpathSafe(path.dirname(abs));
  if (!realParent) return null;
  for (const root of roots) {
    if (isContained(realParent, root)) return path.join(realParent, path.basename(abs));
  }
  return null;
}

function sendJson(res, status, body) {
  const data = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(data);
}

function isBinaryBuffer(buf) {
  const n = Math.min(buf.length, 8192);
  for (let i = 0; i < n; i++) {
    if (buf[i] === 0) return true;
  }
  return false;
}

async function handleList(ctx, req, res) {
  const url = new URL(req.url, "http://localhost");
  const requested = url.searchParams.get("path");
  const real = await resolveAllowed(ctx, requested);
  if (!real) return sendJson(res, 403, { ok: false, error: "denied" });

  let st;
  try {
    st = await fs.stat(real);
  } catch {
    return sendJson(res, 404, { ok: false, error: "not-found" });
  }
  if (!st.isDirectory()) return sendJson(res, 400, { ok: false, error: "not-a-directory" });

  let entries;
  try {
    entries = await fs.readdir(real, { withFileTypes: true });
  } catch {
    return sendJson(res, 500, { ok: false, error: "unreadable" });
  }

  const dirs = [];
  const files = [];
  let truncated = false;
  for (const ent of entries) {
    if (dirs.length + files.length >= MAX_LIST_ENTRIES) {
      truncated = true;
      break;
    }
    const name = ent.name;
    if (name === "." || name === "..") continue;
    const full = path.join(real, name);
    try {
      const s = await fs.stat(full);
      if (s.isDirectory()) {
        dirs.push({ name, path: full, kind: "dir" });
      } else {
        files.push({ name, path: full, kind: "file", size: s.size, mtimeMs: s.mtimeMs });
      }
    } catch {
      // unreadable / dangling symlink — skip
    }
  }

  dirs.sort((a, b) => a.name.localeCompare(b.name, "en"));
  files.sort((a, b) => a.name.localeCompare(b.name, "en"));

  sendJson(res, 200, {
    ok: true,
    path: real,
    parent: path.dirname(real),
    dirs,
    files,
    truncated
  });
}

const MAX_TREE_FILES = 30000; // recursive quick-open cap
const SKIP_DIRS = new Set(["node_modules", ".git", ".hg", ".svn", ".cache", "dist", "build", "out", "coverage", ".next", ".nuxt", ".turbo", "vendor"]);

async function walkFiles(real, base, out, limit) {
  if (out.files.length >= limit) {
    out.truncated = true;
    return;
  }
  let entries;
  try {
    entries = await fs.readdir(real, { withFileTypes: true });
  } catch {
    return; // unreadable directory — skip subtree
  }
  for (const ent of entries) {
    if (out.files.length >= limit) {
      out.truncated = true;
      return;
    }
    const name = ent.name;
    if (name === "." || name === "..") continue;
    const full = path.join(real, name);
    if (ent.isDirectory()) {
      if (SKIP_DIRS.has(name)) continue;
      await walkFiles(full, base, out, limit);
    } else if (ent.isFile()) {
      out.files.push({ name, path: full, rel: path.relative(base, full) });
    }
  }
}

async function handleFiles(ctx, req, res) {
  const url = new URL(req.url, "http://localhost");
  const requested = url.searchParams.get("path");
  const real = await resolveAllowed(ctx, requested);
  if (!real) return sendJson(res, 403, { ok: false, error: "denied" });

  let st;
  try {
    st = await fs.stat(real);
  } catch {
    return sendJson(res, 404, { ok: false, error: "not-found" });
  }
  if (!st.isDirectory()) return sendJson(res, 400, { ok: false, error: "not-a-directory" });

  const out = { files: [], truncated: false };
  await walkFiles(real, real, out, MAX_TREE_FILES);
  out.files.sort((a, b) => a.rel.localeCompare(b.rel, "en"));
  sendJson(res, 200, { ok: true, path: real, files: out.files, truncated: out.truncated });
}

async function handleRead(ctx, req, res) {
  const url = new URL(req.url, "http://localhost");
  const requested = url.searchParams.get("path");
  const real = await resolveAllowed(ctx, requested);
  if (!real) return sendJson(res, 403, { ok: false, error: "denied" });

  let st;
  try {
    st = await fs.stat(real);
  } catch {
    return sendJson(res, 404, { ok: false, error: "not-found" });
  }
  if (st.isDirectory()) return sendJson(res, 400, { ok: false, error: "directory" });

  if (st.size > MAX_READ_BYTES) {
    return sendJson(res, 200, { ok: true, size: st.size, content: null, truncated: true, binary: false });
  }

  let buf;
  try {
    buf = await fs.readFile(real);
  } catch {
    return sendJson(res, 500, { ok: false, error: "unreadable" });
  }

  const binary = isBinaryBuffer(buf);
  const content = binary ? null : buf.toString("utf8");
  sendJson(res, 200, { ok: true, size: st.size, content, truncated: false, binary });
}

async function handleRaw(ctx, req, res) {
  const url = new URL(req.url, "http://localhost");
  const requested = url.searchParams.get("path");
  const real = await resolveAllowed(ctx, requested);
  if (!real) {
    res.writeHead(403);
    res.end();
    return;
  }

  let st;
  try {
    st = await fs.stat(real);
  } catch {
    res.writeHead(404);
    res.end();
    return;
  }
  if (st.isDirectory()) {
    res.writeHead(400);
    res.end();
    return;
  }
  if (st.size > MAX_RAW_BYTES) {
    res.writeHead(413);
    res.end();
    return;
  }

  let buf;
  try {
    buf = await fs.readFile(real);
  } catch {
    res.writeHead(500);
    res.end();
    return;
  }

  const ext = path.extname(real).toLowerCase();
  res.writeHead(200, {
    "Content-Type": RAW_MIME[ext] || "application/octet-stream",
    "Cache-Control": "no-store",
    "Content-Length": buf.length
  });
  res.end(buf);
}

async function readRequestBody(req) {
  let body = "";
  for await (const chunk of req) {
    body += typeof chunk === "string" ? chunk : chunk.toString("utf8");
  }
  return body;
}

async function handleWrite(ctx, req, res) {
  if (req.method !== "POST") {
    res.writeHead(405, { Allow: "POST" });
    res.end();
    return;
  }
  let parsed;
  try {
    parsed = JSON.parse(await readRequestBody(req));
  } catch {
    return sendJson(res, 400, { ok: false, error: "bad-json" });
  }
  const requested = parsed && parsed.path;
  const content = parsed && parsed.content;
  if (typeof requested !== "string" || typeof content !== "string") {
    return sendJson(res, 400, { ok: false, error: "bad-request" });
  }

  const real = await resolveWriteTarget(ctx, requested);
  if (!real) return sendJson(res, 403, { ok: false, error: "denied" });

  let st = null;
  try {
    st = await fs.stat(real);
  } catch {
    /* may not exist yet */
  }
  if (st && st.isDirectory()) return sendJson(res, 400, { ok: false, error: "directory" });

  const tmp = real + ".dsh-tmp-" + process.pid + "-" + Date.now();
  try {
    await fs.writeFile(tmp, content, "utf8");
    await fs.rename(tmp, real);
  } catch {
    try {
      await fs.unlink(tmp);
    } catch {
      /* ignore cleanup failure */
    }
    return sendJson(res, 500, { ok: false, error: "write-failed" });
  }
  sendJson(res, 200, { ok: true, path: real });
}

export const inject = ["webServer", "workspaceRegistry"];
export const name = "file-explorer";

export function apply(ctx) {
  ctx.effect(() => {
    const d1 = ctx.webServer.register({
      kind: "exact",
      path: "/plugin/file-explorer/list",
      handler: (req, res) => handleList(ctx, req, res)
    });
    const d2 = ctx.webServer.register({
      kind: "exact",
      path: "/plugin/file-explorer/read",
      handler: (req, res) => handleRead(ctx, req, res)
    });
    const d3 = ctx.webServer.register({
      kind: "exact",
      path: "/plugin/file-explorer/raw",
      handler: (req, res) => handleRaw(ctx, req, res)
    });
    const d4 = ctx.webServer.register({
      kind: "exact",
      path: "/plugin/file-explorer/write",
      handler: (req, res) => handleWrite(ctx, req, res)
    });
    const d5 = ctx.webServer.register({
      kind: "exact",
      path: "/plugin/file-explorer/files",
      handler: (req, res) => handleFiles(ctx, req, res)
    });
    return () => {
      d1();
      d2();
      d3();
      d4();
      d5();
    };
  }, "file-explorer: routes");
}
