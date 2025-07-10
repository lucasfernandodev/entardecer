import { resolve } from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { defineManifest } from "@crxjs/vite-plugin/dist/index.mjs";
import manifest from './manifest.config';
import eslint from 'vite-plugin-eslint';


const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

// https://vitejs.dev/config/
export default defineConfig({
  root,
  server: { port: 3000, hmr: { port: 3000 } },
  plugins: [react(), defineManifest({ manifest }), eslint()],
  build: {
    outDir,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'pages', 'popup', 'index.html'),
        homepage: resolve(root, 'pages', 'homepage', 'index.html')
      }
    }
  }
})
