import { build } from "esbuild";

const shared = {
  entryPoints: ["src/index.js"],
  bundle: true,
  minify: true,
  sourcemap: true,
};

await build({ ...shared, format: "esm", outfile: "dist/dotmatrix-loader.esm.js" });
await build({ ...shared, format: "cjs", outfile: "dist/dotmatrix-loader.cjs.js" });
await build({
  ...shared,
  format: "iife",
  globalName: "DotMatrixLoader",
  outfile: "dist/dotmatrix-loader.global.js",
});

console.log("Build complete: dist/dotmatrix-loader.{esm,cjs,global}.js");
