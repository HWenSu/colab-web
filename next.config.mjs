/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/, // <--- 加上這個，表示只有在 import 到 JS/TS 時才使用 svgr
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
