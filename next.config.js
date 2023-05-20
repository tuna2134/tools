/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ["cdn.discordapp.com"]
    }
}

if (process.env.MODE === "standalone") {
    nextConfig.output = "standalone" 
};

module.exports = nextConfig
