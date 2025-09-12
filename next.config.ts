/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["quickcart.greatstack.in"], // 👈 whitelist external host
  },
};

module.exports = nextConfig;
