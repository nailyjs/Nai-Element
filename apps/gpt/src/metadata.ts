/* eslint-disable */
export default async () => {
  const t = {};
  return {
    "@nestjs/swagger": {
      models: [],
      controllers: [[import("./app.controller"), { AppController: { getHello: { summary: "\u4E3B\u9875", type: Number } } }]],
    },
  };
};
