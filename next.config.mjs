/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: "standalone",
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                // TODO: Temporary remote pattern. Change when we have decided where to retrieve images from.
                hostname: 'www.nb.no',
                port: '',
                pathname: '/services/image/resolver/**'
            }
        ]
    }
};

export default nextConfig;
