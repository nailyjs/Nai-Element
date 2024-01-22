module.exports = {
  apps: [
    {
      name: "Passport",
      script: "./resources/dist/apps/passport/main.js",
      env: {
        NODE_ENV: "development",
      },
    },
    {
      name: "Shop",
      script: "./resources/dist/apps/shop/main.js",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
  exec_mode: "cluster",
  combine_logs: true,
};
