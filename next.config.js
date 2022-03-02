/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/assets/:path',
        destination: `${process.env.S3_URL}/:path`, // Proxy to S3
      },
      {
        source: '/ip/:path',
        destination: 'http://ip-api.com/json/:path', // Proxy to IP API
      },
      {
        source: '/ip',
        destination: 'http://ip-api.com/json', // Proxy to IP API
      },
    ];
  },
};
