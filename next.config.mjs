/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  async redirects() {
    return [
      // Bare root redirects to the default locale. Locale preference beyond
      // this first hop is handled client-side (localStorage) without forcing
      // a redirect on every visit.
      { source: '/', destination: '/fa', permanent: false },
    ];
  },
};

export default nextConfig;
