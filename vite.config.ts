import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
         // example : additionalData: `@import "./src/design/styles/variables";`
         // dont need include file extend .scss
         additionalData: `@import "./src/@shared/styles/mixins.scss";`
     }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assessment': fileURLToPath(new URL('./src/assessment', import.meta.url)),
      '@portal': fileURLToPath(new URL('./src/portal', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/@shared', import.meta.url))
    }
  }
})
