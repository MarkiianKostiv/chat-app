import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "https://chat-app-9qwi.onrender.com",
        // target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
