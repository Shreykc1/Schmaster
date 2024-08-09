import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(),

    VitePWA({
      srcDir: 'src',
  filename: 'sw.js',
  devOptions: {
    enabled: true,
    type: 'module', // Specify the type as module
  },
  strategies: 'injectManifest',
  injectManifest: {
    injectionPoint: undefined
  },
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Vite PWA Project',
        short_name: 'Vite PWA Project',
        theme_color: '#1d1d1d',
        icons: [
          {
            src: '/logo-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: '/logo-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logo-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
      },
    })

  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
