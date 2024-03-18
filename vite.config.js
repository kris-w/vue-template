import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': process.env
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },  
  base: '/', // Set your base URL here  
})
