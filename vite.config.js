import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,    // Permet à l'application d'être accessible sur tous les hôtes
    port: 5173     // Spécification du port sur lequel l'application écoute
  }
});
