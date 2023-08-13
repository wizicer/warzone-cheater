import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.js"),
      name: "warzonect",
      formats: ["cjs"],
      fileName: "warzonect",
    },
    sourcemap: "inline",
  },
});
