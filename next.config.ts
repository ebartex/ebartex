import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["imgstatic.ebartex.pl", "via.placeholder.com"],
  },
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true, // Włącza przywracanie pozycji scrolla
  },
  env: {
    CUSTOM_ENV_VARIABLE: "my_value",
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: "/old-url",
        destination: "/new-url",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://external-api.com/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Custom-Header",
            value: "my-header-value",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
