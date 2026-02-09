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
    // Local network IP (add your machine's IP when accessing via 192.168.x.x)
    "192.168.1.119",
  ],
};

export default nextConfig;
