import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.js',
  swDest: 'public/sw.js',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/_next/static/css/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/css',
          },
        ],
      },
      {
        source: '/_next/static/chunks/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript',
          },
        ],
      },
    ];
  },
  // Add any other Next.js config options here
};

export default withSerwist(nextConfig);
