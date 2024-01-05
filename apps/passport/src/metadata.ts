/* eslint-disable */
export default async () => {
  const t = {
    ["./modules/login/dtos/login.res.dto"]: await import("./modules/login/dtos/login.res.dto"),
  };
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
        [
          import("./modules/login/dtos/login.res.dto"),
          {
            LoginByUsernamePasswordDataOKResponseDTO: {
              access_token: {
                required: true,
                type: () => String,
                description: "\u8BBF\u95EE\u4EE4\u724C",
                default:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ3YXRjcnNzIiwiaWF0IjoxNjEwNjI4NjQyLCJleHAiOjE2MTA2MzIyNDIsImlzcyI6IndhdGNyc3MiLCJzdWIiOiJ3YXRjcnNzIiwidXNlcm5hbWUiOiJaa",
              },
              userID: { required: true, type: () => Number, description: "\u5237\u65B0\u4EE4\u724C", default: 1 },
              createdAt: { required: true, type: () => Date, description: "\u6CE8\u518C\u65F6\u95F4" },
              updatedAt: { required: true, type: () => Date, description: "\u66F4\u65B0\u65F6\u95F4" },
              username: { required: true, type: () => String, description: "\u7528\u6237\u540D", default: "Zero" },
              ip: { required: true, type: () => String, description: "IP", default: "0.0.0.0" },
              saying: {
                required: true,
                type: () => String,
                description: "\u4E2A\u6027\u7B7E\u540D",
                default: "\u8FD9\u4E2A\u4EBA\u5F88\u61D2\uFF0C\u4EC0\u4E48\u90FD\u6CA1\u6709\u5199\u54E6",
              },
              avatar: {
                required: true,
                type: () => String,
                description: "\u5934\u50CF\u5730\u5740",
                default: "https://avatars.githubusercontent.com",
              },
            },
            LoginByUsernamePasswordOKResponseDTO: {
              statusCode: { required: true, type: () => Number, description: "HTTP\u72B6\u6001\u7801", default: 201 },
              code: { required: true, type: () => Number, description: "\u7CFB\u7EDF\u72B6\u6001\u7801", default: 1000 },
              message: { required: true, type: () => String, description: "\u4FE1\u606F", default: "\u767B\u5F55\u6210\u529F" },
              data: {
                required: true,
                type: () => t["./modules/login/dtos/login.res.dto"].LoginByUsernamePasswordDataOKResponseDTO,
                description: "\u6570\u636E",
              },
            },
          },
        ],
        [
          import("./modules/register/dtos/register.dto"),
          {
            RegisterByEmailPasswordBodyDTO: {
              email: { required: true, type: () => String, description: "\u90AE\u7BB1" },
              username: { required: true, type: () => String, description: "\u7528\u6237\u540D" },
              password: { required: true, type: () => String, description: "\u5BC6\u7801", minLength: 6 },
              verifyCode: { required: true, type: () => Number, description: "\u9A8C\u8BC1\u7801" },
            },
          },
        ],
      ],
      controllers: [
        [import("./app.controller"), { AppController: { getHello: { summary: "\u4E3B\u9875", type: String } } }],
        [
          import("./modules/login/controllers/login.controller"),
          {
            LoginController: {
              loginByUsernamePassword: {
                summary: "\u901A\u8FC7\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55",
                type: t["./modules/login/dtos/login.res.dto"].LoginByUsernamePasswordDataOKResponseDTO,
              },
            },
          },
        ],
        [
          import("./modules/register/controllers/register.controller"),
          { RegisterController: { registerByEmailPassword: { summary: "\u901A\u8FC7\u90AE\u7BB1\u5BC6\u7801\u6CE8\u518C" } } },
        ],
      ],
    },
  };
};
