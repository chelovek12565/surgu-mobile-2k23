// import { API_URL } from './config.js'

const { SubresourceIntegrityPlugin } = require('webpack-subresource-integrity');
const { createSecureHeaders } = require("next-secure-headers");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: createSecureHeaders({
  //          contentSecurityPolicy: {
  //           directives: {
  //             defaultSrc: [
  //               "'self'"
  //             ],
  //             styleSrc: ["'self'", "'unsafe-inline'"],
  //             imgSrc: ["'self'"],
  //             baseUri: "self",
  //             formAction: "self",
  //             frameAncestors: true,
  //           },
  //         },
  //         frameGuard: "deny",
  //         noopen: "noopen",
  //         nosniff: "nosniff",
  //         xssProtection: "sanitize",
  //         forceHTTPSRedirect: [
  //           true,
  //           { maxAge: 60 * 60 * 24 * 360, includeSubDomains: true },
  //         ],
  //         referrerPolicy: "same-origin",
  //       }),
  //     }
  //   ];
  // },
  
  // webpack(config) {
  //   config.output.crossOriginLoading = "anonymous";
  //   config.plugins.push(
  //     new SubresourceIntegrityPlugin({
  //       hashFuncNames: ["sha256", "sha384"],
  //       enabled: true,
  //     })
  //   );
  //   return config;
  // },

  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `https://eventracker.ru/api/v1/:path*`,
        // destination: `http://localhost:5000/:path*`,
        
      },
    ]
},
}

module.exports = nextConfig
