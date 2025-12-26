module.exports = {
  typescript: true,
  svgo: true,
  svgoConfig: {
    plugins: [
      {
        name: "removeViewBox",
        active: false,
      },
    ],
  },
  replaceAttrValues: {
    "#000": "currentColor",
    black: "currentColor",
  },
  icon: true,
  ref: true,
}

