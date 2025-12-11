import { fileURLToPath, URL } from 'node:url'
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [Vue()],
  test: {
    resolveSnapshotPath: (path, extension) => {
      const file = path.split('/').slice(-1).join('/')
      return './snapshots/' + file + extension
    },
    globals: true,
    environment: 'jsdom',
    env: loadEnv('', process.cwd(), ''),
    setupFiles: 'vitest.setup.ts',
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assessment': fileURLToPath(new URL('./src/assessment', import.meta.url)),
      '@portal': fileURLToPath(new URL('./src/portal', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/@shared', import.meta.url))
    },
    reporters: [
      'default', // Vitest's default reporter so that terminal output is still visible
      ['vitest-sonar-reporter', { outputFile: 'sonar-report.xml' }],
    ],
    coverage: {
      reporter: ['text', 'html', 'lcov'],
    },
  },
})
