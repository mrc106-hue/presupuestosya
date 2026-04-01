/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['cdn.leonardo.ai', 'supabase.co', 'storage.googleapis.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}
module.exports = nextConfig
