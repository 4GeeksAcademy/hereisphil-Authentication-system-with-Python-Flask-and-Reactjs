import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Hide warnings coming from node_modules (Bootstrap)
        quietDeps: true,
        // Silence specific Sass deprecations Bootstrap 5.3 triggers
        silenceDeprecations: [
          "import", // @import deprecation
          "global-builtin", // mix()/unit() old APIs
          "color-functions", // red()/green()/blue()
        ],
      },
    },
  },
});
