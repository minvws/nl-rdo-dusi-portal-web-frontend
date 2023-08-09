import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@review': fileURLToPath(new URL('./src/review', import.meta.url)),
      '@portal': fileURLToPath(new URL('./src/portal', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/@shared', import.meta.url))
    }
  }
})
