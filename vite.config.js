import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config with Vitest setup for handling React files
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Make sure jsdom is set for React tests
    globals: true,         // Use global variables like `describe`, `it`, etc.
    transformMode: {
      web: [/.[tj]sx$/],  // Allow .jsx and .tsx files to be transformed
    },
    coverage: {
      reporter: ['text', 'json', 'html'], // Optional: Collect code coverage
    },
  },
});
