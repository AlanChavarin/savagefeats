/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    domains: ['yt3.ggpht.com']
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
