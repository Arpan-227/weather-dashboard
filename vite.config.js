import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/weather-dashboard/', // ← exact repo name
  plugins: [react()],
})
