import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  images:{
    domains: ['files.stripe.com', 'github.com']
  }
};

export default nextConfig;

