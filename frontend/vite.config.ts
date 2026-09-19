import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:5093",
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            if(!options.target) return;
            const target = new URL(options.target);
            const finalUrl = `${target.origin}${req.url}`;
            res.setHeader("X-Proxy-Target-URL", finalUrl);
            console.log(`[Vite Proxy] ${req.method} ${req.url} -> ${finalUrl}`);
          });
        },
      },
    },
  },
});
