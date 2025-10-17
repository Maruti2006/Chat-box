/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: false
  },
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig;
