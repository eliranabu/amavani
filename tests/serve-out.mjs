// שרת סטטי מינימלי לבדיקת תיקיית out/ (מתנהג כמו Netlify: index.html לתיקיות ו-404.html לשאר)
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("out");
const port = Number(process.argv[2] ?? 3101);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png", ".txt": "text/plain", ".xml": "application/xml", ".woff2": "font/woff2", ".woff": "font/woff" };

http.createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const candidates = [url, path.join(url, "index.html"), url + ".html"];
  for (const c of candidates) {
    const f = path.join(root, c);
    if (f.startsWith(root) && fs.existsSync(f) && fs.statSync(f).isFile()) {
      res.writeHead(200, { "content-type": types[path.extname(f)] ?? "application/octet-stream" });
      return fs.createReadStream(f).pipe(res);
    }
  }
  res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
  fs.createReadStream(path.join(root, "404.html")).pipe(res);
}).listen(port, () => console.log(`serving out/ on ${port}`));
