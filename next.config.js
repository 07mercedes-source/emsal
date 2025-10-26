/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Vercel static export için
  },
};

module.exports = nextConfig;
