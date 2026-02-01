import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'AI Palm Reader – Tarot & Astrology',
        short_name: 'AI Palm',
        description: 'Your AI Spiritual Guide for Palmistry, Tarot, and Astrology.',
        theme_color: '#0f0c29',
        background_color: '#0f0c29',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/openrouter\.ai\/api/,
            handler: 'NetworkOnly', // Don't cache AI responses, they must be fresh
          }
        ]
      }
    })
  ],
  server: {
    host: true, // Needed for testing on mobile device via local IP
    port: 5173
  }
});
