import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // This should be the output folder you deploy
    rollupOptions: {
      input: 'index.html', // Ensure this points to your HTML entry file
    },
  },
  server: {
    // Ensure correct handling for dev mode
    mimeTypes: {
      '.js': 'application/javascript', // Explicitly tell Vite to serve .js files correctly
    },
  },
});
