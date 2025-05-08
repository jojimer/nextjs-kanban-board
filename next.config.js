/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Add webpack configuration to handle caching issues
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Modify cache behavior for development
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
        cacheDirectory: '/tmp/.next-cache', // Use /tmp for more reliable caching
        name: isServer ? 'server' : 'client',
        version: '1.0.0'
      };
    }
    return config;
  },
};

module.exports = nextConfig;