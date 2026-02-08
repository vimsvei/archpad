import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "node:path";

const withNextIntl = createNextIntlPlugin();

const projectRoot = path.join(__dirname, "../../..");
const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Monorepo: Turbopack and tracing root for correct module resolution
  turbopack: { root: projectRoot },
  output: "standalone",
  outputFileTracingRoot: projectRoot,
  
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "portal.archpad.pro",
    "*.archpad.pro",
  ],
};

export default withNextIntl(nextConfig);
