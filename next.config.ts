import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local, self-authored placeholder SVGs only — safe to allow.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
};

export default nextConfig;
