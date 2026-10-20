/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Caminhos relativos: o mesmo build serve em GitHub Pages (subpasta) e na Vercel (raiz).
  base: './',
  plugins: [react(), tailwindcss()],
  test: { environment: 'node' },
})
