/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['admin.epass.com.np','api.epass.com.np'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.epass.com.np',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'api.epass.com.np',
        port: ''
      }
    ]
  }
}

module.exports = nextConfig
