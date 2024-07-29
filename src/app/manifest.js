export default function manifest() {
  return {
    theme_color: '#7C3AED',
    background_color: '#ffffff',
    display: 'standalone',
    name: 'Zoles Punkti',
    short_name: 'Zoles Punkti',
    description:
      'Neskrien p\u0113c lapas un pildspalvas, skaiti Zoles Punktus \u0161eit',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
