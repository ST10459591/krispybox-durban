const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = 8081;

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    res.writeHead(400);
    return res.end("Bad request");
  }

  const file = path.resolve(root, "." + pathname);


  // Block access to private files and folders
  const blockedFolders = ["backend", "node_modules", ".git"];
  const blockedFiles = [
    ".env",
    ".gitignore",
    "serviceAccountKey.json",
    "package.json",
    "package-lock.json"
  ];

  const requestedParts = pathname.split("/").filter(Boolean);

  const isBlocked =
    requestedParts.some(part =>
      blockedFolders.includes(part.toLowerCase())
    ) ||
    requestedParts.some(part =>
      blockedFiles.includes(part.toLowerCase())
    ) ||
    requestedParts.some(part => part.startsWith("."));

  if (isBlocked) {
    res.writeHead(403);
    return res.end("Forbidden");
  }


  if (file !== root && !file.startsWith(root + path.sep)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  fs.stat(file, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404);
      return res.end("File not found");
    }

    res.writeHead(200, {
      "Content-Type": mime[path.extname(file).toLowerCase()] || "application/octet-stream"
    });
    fs.createReadStream(file).pipe(res);
  });
}).listen(port, "127.0.0.1", () => {
  console.log(`Krispy Box server running at http://127.0.0.1:${port}`);
});
