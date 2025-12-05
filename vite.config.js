import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy apenas em dev
      '/api': {
        target: process.env.VITE_REMOTE_HOST_PRIVADO
          ? `http://${process.env.VITE_REMOTE_HOST_PRIVADO}:8080`
          : 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
