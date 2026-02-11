/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Set basePath if deploying to https://<user>.github.io/<repo>/
  // basePath: '/high-school-wins',
  // assetPrefix: '/high-school-wins/',
};

module.exports = nextConfig;
