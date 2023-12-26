/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/results/2003',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
