import type { NextConfig } from 'next';

// When deploying to GitHub Pages under a project subpath (https://<user>.github.io/<repo>/),
// set NEXT_PUBLIC_BASE_PATH="/<repo>" at build time. Left empty for local dev and root hosts.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
