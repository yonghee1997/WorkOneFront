import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import fs from 'fs';

// 인증서 경로
const keyPath = 'C:/WorkOne/WorkOneFront/cert/localhost-key.pem';
const certPath = 'C:/WorkOne/WorkOneFront/cert/localhost.pem';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    },
    host: 'localhost',
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://localhost:8443',
        changeOrigin:true,
        secure: false, 
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@menu-items': path.resolve(__dirname, 'src/menu-items'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@sections': path.resolve(__dirname, 'src/sections'),
      '@themes': path.resolve(__dirname, 'src/themes'),
      '@store': path.resolve(__dirname, 'src/store'),
    }
  }
})
