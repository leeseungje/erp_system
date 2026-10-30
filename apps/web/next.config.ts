import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  basePath: isProd ? '/erp_system' : '',
  assetPrefix: isProd ? '/erp_system/' : '',
  images: {
    unoptimized: true
  }
}

export default nextConfig
