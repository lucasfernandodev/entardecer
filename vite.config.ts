import {resolve} from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from "@crxjs/vite-plugin";
import manifest from './manifest.config';
import vitePluginFaviconInject from 'vite-plugin-favicons-inject'

const root = resolve(__dirname, 'src');
const outDir ='../dist';


// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [react(), crx({ manifest }), vitePluginFaviconInject('./src/public/images/logo.svg')],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'pages', 'popup', 'index.html'),
        homepage: resolve(root, 'pages', 'homepage', 'index.html')
      }
    }
  }
})
