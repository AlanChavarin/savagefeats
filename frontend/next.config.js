/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    //domains: ['yt3.ggpht.com', 'res.cloudinary.com', 'cloudfront.net', 'artstation']
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
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
