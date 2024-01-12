/** @type {import('next').NextConfig} */
const nextConfig = {
    webpackDevMiddleware: (config) => {
        config.watchOptions = {
            poll: 400,
            aggregateTimeout: 300,
        }
        return config
    }
}

module.exports = nextConfig
