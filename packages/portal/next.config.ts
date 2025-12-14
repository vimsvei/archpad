import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "node:path";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,

  transpilePackages: ["@archpad/contracts"],

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
  ],
  
  // webpack(config) {
  //   const fileLoaderRule = config.module.rules.find(
  //     (rule: any) =>
  //       typeof rule === "object" &&
  //       rule !== null &&
  //       rule.test instanceof RegExp &&
  //       rule.test.test(".svg")
  //   ) as any;
  //
  //   if (fileLoaderRule) {
  //     config.module.rules.push(
  //       {
  //         ...fileLoaderRule,
  //         test: /\.svg$/i,
  //         resourceQuery: /url/,
  //       },
  //       {
  //         test: /\.svg$/i,
  //         issuer: /\.[jt]sx?$/,             // импорт только из ts/tsx/js/jsx
  //         resourceQuery: { not: [/url/] },  // без ?url
  //         use: [
  //           {
  //             loader: "@svgr/webpack",
  //             options: {
  //               icon: true,
  //               ref: true,
  //               svgo: true,
  //               svgoConfig: {
  //                 plugins: [{ name: "removeViewBox", active: false }],
  //               },
  //             },
  //           },
  //         ],
  //       }
  //     );
  //     fileLoaderRule.exclude = /\.svg$/i;
  //   }
  //   return config;
  // }
};

export default withNextIntl(nextConfig);
