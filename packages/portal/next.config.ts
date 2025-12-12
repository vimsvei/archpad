import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
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
