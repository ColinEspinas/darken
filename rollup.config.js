import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/darken.js",
      format: "cjs",
      exports: "auto",
    },
    {
      file: "dist/darken.mjs",
      format: "es",
    },
    {
      file: "dist/darken.umd.js",
      format: "umd",
      name: "Darken",
    },
    {
      file: "dist/darken.min.js",
      format: "cjs",
      exports: "auto",
      plugins: [terser()],
    },
    {
      file: "dist/darken.min.mjs",
      format: "es",
      plugins: [terser()],
    },
    {
      file: "dist/darken.umd.min.js",
      format: "umd",
      name: "Darken",
      plugins: [terser()],
    },
  ],
};