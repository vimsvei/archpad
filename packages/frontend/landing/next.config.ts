import type { NextConfig } from 'next';
import path from 'node:path';

const projectRoot = path.join(__dirname, '../../..');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: { root: projectRoot },
  output: 'standalone',
  outputFileTracingRoot: projectRoot,
};

export default nextConfig;
