import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Cette option permet à Vite de lire ton code existant (.js) sans devoir tout renommer
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.js?$/,
    exclude: [],
  },
});
