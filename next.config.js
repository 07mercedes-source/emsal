/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // true bazen useRouter timing hatalarına yol açabiliyor
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
