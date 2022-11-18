/** @type {import('next').NextConfig} */

const { withFrameworkConfig } = require("./framework/common/config");

// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   i18n: {
//     locales: ["en-US"],
//     defaultLocale: "en-US",
//   },
// };

module.exports = withFrameworkConfig({
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
});

console.log(JSON.stringify(module.exports, null, 2));
