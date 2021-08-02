module.exports = {
  reactStrictMode: true,
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/dokusho',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
    ]
  },
}
