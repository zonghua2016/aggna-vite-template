import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteImagemin from 'vite-plugin-imagemin';
import viteCompression from 'vite-plugin-compression'
import viteHtml from 'vite-plugin-html'

import { join, resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '.',
  plugins: [
    vue(),
    viteCompression({
      //生成压缩包gz
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
    viteHtml({
      inject: {
        data: {
          title: 'aggna-vite-template',
          // injectScript: '<script src="./inject.js"></script>',
        },
      },
      minify: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${resolve(__dirname, 'src/assets/styles/main.less')}";`
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: join(__dirname, 'src/'),
      }, {
        find: 'views/',
        replacement: join(__dirname, 'src/views/'),
      }, {
        find: 'cmpts/',
        replacement: join(__dirname, 'src/components/'),
      }, {
        find: 'hooks/',
        replacement: join(__dirname, 'src/hooks/'),
      }, {
        find: 'utils/',
        replacement: join(__dirname, 'src/utils/'),
      }, {
        find: 'imgs/',
        replacement: join(__dirname, 'src/assets/imgs/'),
      }, {
        find: 'api/',
        replacement: join(__dirname, 'src/api/'),
      },
    ],
  },
  build: {
    minify: 'esbuild',
    // 禁用 brotli 压缩大小报告
    brotliSize: false,
    terserOptions: {
      compress: {
        keep_infinity: true,
        // 用于删除生产环境中的console
        drop_console: true,
      },
    },
    assetsDir: 'static/imgs/',
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 2000,
  },
  server: {
    port: 8000,
    open: false,
    https: false,
    cors: true,
    // proxy: {
    //   '^/api': {
    //     target: 'xxx',
    //     changeOrigin: true,
    //     secure: true,
    // rewrite: (path) => path.replace('^\/api/', ''),
    // },
    // }
  },
});
