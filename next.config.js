/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
			{
				protocol: "https",
				hostname: "i.ibb.co",
			},
			{
				protocol: "https",
				hostname: "Lh0xVQW/01-team.png",
			},
			{
				protocol: "https",
				hostname: "img.freepik.com",
			},
		],
	},
};

module.exports = nextConfig;
