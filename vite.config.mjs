import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "172.25.0.10", // Listen on all network interfaces
    port: 5173, // Or any port you prefer
  },
});
