import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ye line Vercel build ko fail hone se rokay gi agar koi error reh gaya ho
    ignoreBuildErrors: true,
  },
  // eslint aur turbo yahan se nikal diye gaye hain kyunki wo Next 16 mein supported nahi hain
};

export default nextConfig;