import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Backend local não libera CORS por padrão (CORS_ORIGINS vazio em .env — ver
      // docs/08-autenticacao.md §9.1). Em vez de mexer no backend, o dev server do
      // Vite faz proxy same-origin: o navegador chama /api/... em localhost:5173
      // (sem preflight de CORS) e o Vite repassa para o backend server-to-server.
      // Requer VITE_API_URL não definida (ou "/api/v1") em .env — ver .env.example.
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
