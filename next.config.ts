import type { NextConfig } from "next";
import { redirects } from "./lib/redirects";

const config: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: { formats: ["image/webp"], qualities: [40, 60, 75] },
  experimental: { serverActions: { bodySizeLimit: "5mb" } },
  async redirects() {
    return redirects;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default config;
