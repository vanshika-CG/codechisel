import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts:[
      '371f-2409-40c1-5004-8229-5007-ed34-3a4b-f9ec.ngrok-free.app'
    ]
  }
})
