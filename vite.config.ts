import { resolve } from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from "@crxjs/vite-plugin";
import manifest from './manifest.config';
import { version } from './package.json';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  root,
  server: { port: 3000, hmr: { port: 3000 } },
  plugins: [react(), crx({ manifest, browser: 'firefox' })],
  build: {
    outDir,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'pages', 'popup', 'index.html'),
        homepage: resolve(root, 'pages', 'homepage', 'index.html')
      }
    },
  },
})
