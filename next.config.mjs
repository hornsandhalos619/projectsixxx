/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "image.spreadshirtmedia.com" },
      { protocol: "https", hostname: "images.threadless.com" },
      { protocol: "https", hostname: "i.etsystatic.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
    ],
  },
  experimental: {
    optimizePackageImports: [],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      { source: "/shop/hnh", destination: "/shop?source=hnh", permanent: false },
      { source: "/shop/spreadshirt", destination: "/shop?source=spreadshirt", permanent: false },
      { source: "/shop/threadless", destination: "/shop?source=threadless", permanent: false },
      { source: "/shop/etsy", destination: "/shop?source=etsy", permanent: false },
      { source: "/shop/affiliates", destination: "/shop?source=affiliate", permanent: false },
      { source: "/shop/affiliate", destination: "/shop?source=affiliate", permanent: false },
      { source: "/shop/realm", destination: "/shop", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
