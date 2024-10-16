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
  permissions: ['activeTab', 'contextMenus', 'tabs', 'identity', 'storage'],
  action: {
    default_title: 'Localhost Switcher',
    default_popup: 'index.html'
  },
  background: {
    service_worker: './src/background.ts',
    type: 'module',
  },
  content_security_policy: {
    extension_pages: "script-src 'self'; object-src 'self';",
  }
}));