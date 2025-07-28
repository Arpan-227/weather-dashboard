import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/weather-dashboard/', // 💥 this is your repo name!
  plugins: [react()],
});
