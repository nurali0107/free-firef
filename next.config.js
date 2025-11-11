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
  images: {
    domains: [],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
  poweredByHeader: false,
};

