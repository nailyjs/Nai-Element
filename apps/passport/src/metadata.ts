/* eslint-disable */
export default async () => {
  const t = {};
  return {
    "@nestjs/swagger": {
      models: [
        [
          import("./modules/login/dtos/login.dto"),
          {
            LoginByUsernamePasswordDTO: {
              username: { required: true, type: () => String, description: "\u7528\u6237\u540D" },
              password: { required: true, type: () => String, description: "\u5BC6\u7801" },
            },
          },
        ],
        [import("./modules/login/dtos/login.res.dto"), { LoginByUsernamePasswordOKResponseDTO: {} }],
      ],
      controllers: [
        [import("./app.controller"), { AppController: { getHello: { summary: "\u4E3B\u9875", type: String } } }],
        [
          import("./modules/login/controllers/login.controller"),
          { LoginController: { loginByUsernamePassword: { summary: "\u901A\u8FC7\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55" } } },
        ],
      ],
    },
  };
};
