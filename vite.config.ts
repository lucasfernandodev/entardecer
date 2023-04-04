import { resolve } from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from "@crxjs/vite-plugin";
import manifest from './manifest.config';
import eslint from 'vite-plugin-eslint';


const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [react(), crx({ manifest }), eslint()],
  build: {
    outDir,
    rollupOptions: {
      input: {
        main: resolve(root, 'pages', 'popup', 'index.html'),
        homepage: resolve(root, 'pages', 'homepage', 'index.html')
      }
    }
  }
})
