import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  i18n: {
    locales: ['en', 'ko'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'scontent-bos5-1.cdninstagram.com',
      'live.staticflickr.com',
    ],
  },
};

export default nextConfig;
