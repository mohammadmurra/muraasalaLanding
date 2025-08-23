import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the Muraasla landing page.
// It uses the React plugin for JSX/TSX support and enables
// hot module replacement during development.

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    port: 5173,
    open: true
  }
});