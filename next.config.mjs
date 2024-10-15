/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.nb.no',
                port: '',
                pathname: '/services/image/resolver/**'
            }
        ]
    }
};

export default nextConfig;
