/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '*.googleusercontent.com'
      },
      {
        hostname: 'linklist-files-1.s3.amazonaws.com',
      },
    ],
  }
}

module.exports = nextConfig
