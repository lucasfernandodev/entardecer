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
  description: 'Adicione atalhos ou personalize uma nova pagina inicial.',
  chrome_url_overrides: {
    newtab: 'pages/homepage/index.html',
  },
  options_page: 'pages/configurations/index.html',
  content_scripts: [
    {
      js: ['services/chrome/content-script.tsx'],
      matches: ['*://*/*'],
    },
  ],
  permissions: ['favicon', 'storage', 'contextMenus', 'tabs', 'activeTab', 'scripting'],
  host_permissions: ['*://*/*'],
  web_accessible_resources: [
    {
      resources: [
        'images/error.svg',
        '_favicon/*'
      ],
      matches: ['<all_urls>'],
      "extension_ids": ["*"]
    },
  ],
}));
