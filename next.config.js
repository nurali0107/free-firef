module.exports = {
  i18n: {
    defaultLocale: 'kz',
    locales: ['kz', 'ru', 'en'],
    localeDetection: true,
  },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  // Optimize images
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  // Compiler options for better browser support
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Generate sitemap
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
  // Webpack configuration for better browser support
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Note: Polyfills are handled by core-js in babel configuration
    // If you need to add custom polyfills, uncomment below:
    // const originalEntry = config.entry;
    // config.entry = async () => {
    //   const entries = await originalEntry();
    //   if (entries['main.js'] && !entries['main.js'].includes('./polyfills.js')) {
    //     entries['main.js'].unshift('./polyfills.js');
    //   }
    //   return entries;
    // };
    
    return config;
  },
  // Experimental features for better browser support
  experimental: {
    optimizeCss: true,
  },
  // Compress output
  compress: true,
  // Power by header
  poweredByHeader: false,
};

