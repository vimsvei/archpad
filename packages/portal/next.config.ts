import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "node:path";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Produce minimal runtime bundle for Docker (copies only .next/standalone).
  output: "standalone",
  // Monorepo: ensure tracing can reach workspace root if needed.
  outputFileTracingRoot: path.join(__dirname, "../.."),
  
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.1.119",
    "portal.192-168-1-119.sslip.io",
    "*.192-168-1-119.sslip.io",
    "portal.archpad.pro",
    "*.archpad.pro",
  ],
};

export default withNextIntl(nextConfig);
