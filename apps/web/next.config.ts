import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  allowedDevOrigins: ['localhost', '127.0.0.1'],
  images: {
    unoptimized: true
  }
}

export default nextConfig
