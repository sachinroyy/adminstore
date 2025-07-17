/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dhaumphvl/**',
      },
    ],
  },
  // Optional: Enable React Strict Mode
  reactStrictMode: true,
  // Optional: Configure webpack
  webpack: (config, { isServer }) => {
    // Important: return the modified config
    return config;
  },
}

module.exports = nextConfig
