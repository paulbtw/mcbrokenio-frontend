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
        source: '/ip',
        destination: process.env.LOCATION_SERVICE_API,
      },
    ];
  },
};
