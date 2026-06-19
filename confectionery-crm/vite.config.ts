import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Configura o Vite com React e TailwindCSS.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
