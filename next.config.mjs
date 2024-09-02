import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.js',
  swDest: 'public/sw.js',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  // async headers() {
  //   return [
  //     {
  //       source: '/_next/static/:path*',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=31536000, immutable',
  //         },
  //       ],
  //     },
  //   ];
  // },
  // // This ensures that all static assets are handled correctly
  // async rewrites() {
  //   return [
  //     {
  //       source: '/_next/static/:path*',
  //       destination: '/_next/static/:path*',
  //     },
  //   ];
  // },
};

export default nextConfig;
// export default withSerwist(nextConfig);
