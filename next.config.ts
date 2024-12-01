import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["imgstatic.ebartex.pl", "via.placeholder.com"], // Dodaj dozwolone domeny
  },
  reactStrictMode: true, // Włącza tryb ścisły Reacta
  reactRoot: true, // Włącza obsługę React Server Components (od Next.js 13.4)
  experimental: {
    scrollRestoration: true, // Umożliwia przywracanie pozycji scrolla
    appDir: true, // Włącza nowy sposób organizacji aplikacji przy użyciu folderu `app`
  },
  env: {
    CUSTOM_ENV_VARIABLE: "my_value", // Dodaje zmienne środowiskowe
  },
  webpack(config, { isServer }) {
    // Możesz dodać konfigurację webpacka tutaj
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // Jeśli używasz bibliotek, które używają `fs` (np. w Node.js)
      };
    }
    return config;
  },
  // Inne opcje konfiguracji
  async redirects() {
    return [
      {
        source: "/old-url",
        destination: "/new-url",
        permanent: true, // Ustawienie 301
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
