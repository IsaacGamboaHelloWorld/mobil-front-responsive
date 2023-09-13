import { fileURLToPath, URL } from 'node:url';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve, dirname } from 'node:path';

export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      forceStringify: true,
      runtimeOnly: false,
      include: resolve(
        dirname(fileURLToPath(import.meta.url)),
        './src/locales',
        './package.json',
      ),
    }),
  ],
  publicDir: './src/assets/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      resolve: './src/assets/',
      sass: {
        resolve: './src/assets/',
        additionalData:
          `@import '@/sass/colors/bpop-colors.sass'\n` +
          `@import '@/sass/colors/bbog-colors.sass'\n` +
          `@import '@/sass/colors/bavv-colors.sass'\n` +
          `@import '@/sass/colors/bocc-colors.sass'\n` +
          `@import '@/sass/colors/main-colors.sass'\n`,
      },
    },
  },
});
