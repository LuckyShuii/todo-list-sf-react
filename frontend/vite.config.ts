import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from "vite-plugin-env-compatible";

export default defineConfig({
  plugins: [
    react({}),
    envCompatible(),
  ],
  server: {
    host: true,
    hmr: {
      path: "/hmr",
      port: 7002,
    },
    watch: { usePolling: true },
    allowedHosts: [
      "http://localhost:7002/",
      "frontend"
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});