/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://www.youtube.com/:path*',
      },
    ]
  }
}

module.exports = nextConfig
