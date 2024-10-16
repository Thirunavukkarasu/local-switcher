import { defineManifest } from '@crxjs/vite-plugin';

import packageJson from './package.json';

const { version } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, '')
  // split into version parts
  .split(/[.-]/);

export default defineManifest(async () => ({
  manifest_version: 3,
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}`,
  // semver is OK in "version_name"
  version_name: version,
  name: 'Localhost Switcher',
  short_name: 'Localhost Switcher',
  description:
    'Quickly switch between localhost URLs. Add custom URLs for easy access.',
  permissions: ['activeTab', 'contextMenus', 'tabs', 'identity', 'storage', 'notifications'],
  action: {
    default_title: 'Localhost Switcher',
    default_popup: 'index.html',
    default_icon: {
      '16': 'icon16.png',
      '32': 'icon32.png',
      '48': 'icon48.png',
      '128': 'icon128.png',
    }
  },
  externally_connectable: {
    matches: ['http://localhost:3000/*'],
  },
  background: {
    service_worker: './src/background.ts',
    type: 'module',
  },
  icons: {
    '16': 'icon16.png',
    '32': 'icon32.png',
    '48': 'icon48.png',
    '128': 'icon128.png'
  },
  commands: {
    "switch-environment": {
      "suggested_key": {
        "default": "Ctrl+Shift+Y"  // You can change this to your desired shortcut
      },
      "description": "Switch environment"
    }
  },
}));