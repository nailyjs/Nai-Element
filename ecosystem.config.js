module.exports = {
  apps: [
    {
      name: "NailyPassport",
      script: "./resources/dist/apps/passport/main.js",
      env: {
        NODE_ENV: "development",
      },
    },
    {
      name: "NailyShop",
      script: "./resources/dist/apps/shop/main.js",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
  exec_mode: "cluster",
  combine_logs: true,
};
