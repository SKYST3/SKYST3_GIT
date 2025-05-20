const path = require("path");

const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack: (config, { isServer }) => {
    // config.resolve.alias["@/*"] = path.resolve(__dirname, "./*");
    config.resolve.alias["@"] = path.resolve(__dirname);

    return config;
  },
  env: process.env.NODE_ENV === "production" && {
    NEXT_PUBLIC_DOMAIN: ".starrynight.luidium.com",
    NEXT_PUBLIC_URL: "https://starrynight.luidium.com",
    NEXT_PUBLIC_API_BASE_URL: "https://api-starrynight.luidium.com/v1",
  },
};

module.exports = withNextIntl(nextConfig);
