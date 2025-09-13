import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url)),
      "@/components": fileURLToPath(new URL('./src/components', import.meta.url)),
      "@/entities": fileURLToPath(new URL('./src/entities', import.meta.url)),
      "@/utils": fileURLToPath(new URL('./src/utils', import.meta.url)),
      "@/integrations": fileURLToPath(new URL('./src/integrations', import.meta.url))
    }
  }
})
