import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Project root config: serve files from `src/`, public assets from parent public folder
export default defineConfig({
  root: 'src',
  publicDir: '../public',
  plugins: [react()],
})
