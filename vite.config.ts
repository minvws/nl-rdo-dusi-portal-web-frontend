import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import preload from 'vite-plugin-preload'
import sortTags from 'vite-plugin-html-sort-tags'
import { analyzer } from 'vite-bundle-analyzer'
import { optimizeLodashImports } from '@optimize-lodash/rollup-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    optimizeLodashImports(),
    preload(),
    sortTags(),
    analyzer({
      analyzerMode: 'static',
      summary: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/@shared/styles/mixins.scss";'
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
