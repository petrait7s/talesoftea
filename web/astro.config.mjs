import { defineConfig } from 'astro/config';

// Static build, uploaded to the domain's public_html on cPanel.
export default defineConfig({
  site: 'https://domain.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
