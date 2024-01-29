/** @type {import('next').NextConfig} */

const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: `./.env.test` });
}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
};

module.exports = nextConfig;
