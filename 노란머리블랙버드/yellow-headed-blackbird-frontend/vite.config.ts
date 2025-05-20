import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],

  server: {
    // API Proxy 설정
    proxy: {
      '/api': {
        target: 'https://hackerton.zirajs.com/',
        // host 필드 값을 백엔드 서버의 host로 변경
        // -> CORS 에러 방지
        changeOrigin: true,
        secure: true,
        //rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
