import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  //npm run dev    ----  command=serve, mode=development
  //npm run build  ----  command=build, mode=production
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [react()],
    server: {
      // host: env.VITE_AGROLAND_FRONTEND_URL,
      port: env.VITE_AGROLAND_FRONTEND_PORT,
      // origin: env.VITE_AGROLAND_FRONTEND_URL + ':' + env.VITE_AGROLAND_FRONTEND_PORT,
      origin: '*',
    }
  }
})
