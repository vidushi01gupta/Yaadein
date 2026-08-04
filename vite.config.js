import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: [
        "favicon.svg",
        "icon-192.png",
        "icon-512.png",
        "apple-touch-icon.png"
      ],
      manifest: {
        name: "YAADEIN",
        short_name: "YAADEIN",
        description: "90s nostalgia word game",
        start_url: "/",
        display: "standalone",
        background_color: "#c0c0c0",
        theme_color: "#000080",
        categories: ["games", "entertainment"],
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,svg,mp3,json}"]
      }
    })
  ]
});
