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
      // Industries no longer have individual pages; old links land on the list.
      { source: '/:locale(fa|en)/industries/:slug', destination: '/:locale/industries', permanent: true },
      // The team page was retired; send old links to About.
      { source: '/:locale(fa|en)/team', destination: '/:locale/about', permanent: true },
    ];
  },
};

export default nextConfig;
