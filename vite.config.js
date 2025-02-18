import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Mina-Portfolio/', // Repository name for GitHub Pages
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'dist/index.html', // Source file to copy
          dest: '', // Destination for the copied file (root of dist folder)
          rename: '404.html', // Rename index.html to 404.html
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['mixed-decls'],
      },
    },
  },
});
