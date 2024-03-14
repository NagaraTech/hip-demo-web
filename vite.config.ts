import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import '@/assets/style/sassConfig.scss';"
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@views': path.resolve(__dirname, './src/views'),
    }
  },
  // server: {
  //   host: '0.0.0.0',
  //   port: 3000,
  //   open: true,
  //   proxy: {
  //     '/api': {
  //       target: 'http://v3.web-jshtml.cn',
  //       changeOrigin: true,
  //       rewrite: (path: string) => path.replace(/^\/api/, '/api')
  //     }
  //   }
  // }
})