import { resolve } from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from "@crxjs/vite-plugin";
import manifest from './manifest.config';


const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const workerImportMetaUrlRE =
  /\bnew\s+(?:Worker|SharedWorker)\s*\(\s*(new\s+URL\s*\(\s*('[^']+'|"[^"]+"|`[^`]+`)\s*,\s*import\.meta\.url\s*\))/g

// https://vitejs.dev/config/
export default defineConfig({
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
  optimizeDeps: {
    exclude: ["@jsquash/avif", "@jsquash/jpeg", "@jsquash/jxl", "@jsquash/png", "@jsquash/webp"]
  },
  worker: {
    format: 'es',
    // https://github.com/vitejs/vite/issues/7015
    // https://github.com/vitejs/vite/issues/14499#issuecomment-1740267849
    plugins: [
      {
        name: 'Disable nested workers',
        enforce: 'pre',
        transform(code, id) {
          if (code.includes('new Worker') && code.includes('new URL') && code.includes('import.meta.url')) {
            return code.replace(workerImportMetaUrlRE, `((() => { throw new Error('Nested workers are disabled') })()`);
          }
        }
      }
    ]
  }
})
