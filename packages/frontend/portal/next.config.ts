import type { NextConfig } from "next";
import path from "node:path";

const projectRoot = path.join(__dirname, "../../..");
const nextConfig: NextConfig = {
  reactStrictMode: true,

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

export default nextConfig;
