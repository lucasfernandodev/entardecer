import { defineManifest } from '@crxjs/vite-plugin';
import { version } from './package.json';

const names = {
  build: 'Entardecer',
  serve: '[server] Entardecer',
};

// import to `vite.config.ts`
export default defineManifest(async (env) => ({
  manifest_version: 3,
  name: names[env.command],
  version,
  icons: {
    '16': 'images/icons/app/entardecer_16x16.png',
    '32': 'images/icons/app/entardecer_32x32.png',
    '48': 'images/icons/app/entardecer_48x48.png',
    '128': 'images/icons/app/entardecer_128x128.png',
  },
  action: {
    default_popup: 'pages/popup/index.html',
  },
  description: 'Adicione atalhos ou personalize sua nova pagina inicial.',
  chrome_url_overrides: {
    newtab: 'pages/homepage/index.html',
  },
  options_page: 'pages/settings/index.html',
  permissions: ['storage'],
  host_permissions: ['*://*/*'],
  browser_specific_settings: {
    gecko: {
      id: 'lucasfernando.dev@gmail.com',
      strict_min_version: '109.0',
    },
  },
  "content_security_policy": {
    // para Firefox MV3, o campo é csp_directive:
    "extension_pages": "script-src 'self' 'wasm-unsafe-eval'; object-src 'self'"
    // em Chrome MV3 seria:
    // "extension_pages": "script-src 'self' 'wasm-unsafe-eval'; object-src 'self'"
  },
  "web_accessible_resources": [
    {
      "resources": ["*.wasm"],
      "matches": ["<all_urls>"]
    }

  ]
}));
