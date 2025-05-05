import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Основные настройки Next.js
  reactStrictMode: true,

  // Настройка Webpack для обработки SVG
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  }
};

export default nextConfig;