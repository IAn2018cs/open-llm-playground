/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MODEL_CONFIGS: process.env.MODEL_CONFIGS,
  },
};

module.exports = nextConfig;
