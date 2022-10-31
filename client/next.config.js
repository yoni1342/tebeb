/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['m.media-amazon.com'],
	},
	swcMinify: true,
};

module.exports = nextConfig;
