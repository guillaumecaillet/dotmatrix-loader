import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url)).replace(/[/\\]+$/, "");
const port = process.env.PORT || 4321;

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
};

createServer(async (req, res) => {
  if (req.url === "/") {
    res.writeHead(302, { Location: "/demo/index.html" });
    res.end();
    return;
  }

  let reqPath = decodeURIComponent(req.url.split("?")[0]);
  const filePath = normalize(join(root, reqPath));

  if (filePath !== root && !filePath.startsWith(root + sep)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    const data = await readFile(filePath);
    res.writeHead(200, {
      "Content-Type": types[extname(filePath)] || "application/octet-stream",
    });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(port, () => {
  console.log(`dotmatrix-loader demo running at http://localhost:${port}`);
});
