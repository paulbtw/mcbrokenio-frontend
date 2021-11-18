/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/markers.json',
        destination: process.env.MARKER_URL, // Proxy to Backend
      },
    ];
  },
};
