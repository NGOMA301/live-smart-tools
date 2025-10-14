/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,


  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
};

export default withPWA({
  dest: "public", // Service Worker will be generated into /public
  register: true, // Auto-register service worker
  skipWaiting: true, // Activate new SW immediately
  disable: process.env.NODE_ENV === "development", // Disable PWA in dev mode
})(nextConfig);
