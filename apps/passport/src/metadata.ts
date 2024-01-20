/* eslint-disable */
export default async () => {
  const t = {
    ["./modules/login/dtos/login/username/password/login.post.res.dto"]: await import(
      "./modules/login/dtos/login/username/password/login.post.res.dto"
    ),
    ["./modules/user/dtos/user/logging/logging.res.dto"]: await import("./modules/user/dtos/user/logging/logging.res.dto"),
    ["./modules/upyun/dtos/upyun/file.res.dto"]: await import("./modules/upyun/dtos/upyun/file.res.dto"),
  };
  return {
    "@nestjs/swagger": {
      models: [
        [
          import("./modules/login/dtos/login/username/password/login.post.dto"),
          {
            LoginByUsernamePasswordDTO: {
              username: { required: true, type: () => String, description: "\u7528\u6237\u540D" },
              password: { required: true, type: () => String, description: "\u5BC6\u7801" },
            },
          },
        ],
        [
          import("./modules/login/dtos/login/username/password/login.post.res.dto"),
          {
            LoginByUsernamePasswordDataOKResponseDTO: {
              user: {
                required: true,
                type: () => t["./modules/login/dtos/login/username/password/login.post.res.dto"].LoginByUsernamePasswordDataUserOKResponseDTO,
                description: "\u7528\u6237\u4FE1\u606F",
              },
              access_token: { required: true, type: () => String, description: "\u8BBF\u95EE\u4EE4\u724C" },
            },
            LoginByUsernamePasswordDataUserOKResponseDTO: {
              userID: { required: true, type: () => Number, description: "\u7528\u6237ID", default: 1 },
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
                type: () => t["./modules/login/dtos/login/username/password/login.post.res.dto"].LoginByUsernamePasswordDataOKResponseDTO,
                description: "\u6570\u636E",
              },
            },
          },
        ],
        [
          import("./modules/register/dtos/register/email/password/register.dto"),
          {
            RegisterByEmailPasswordBodyDTO: {
              email: { required: true, type: () => String, description: "\u90AE\u7BB1" },
              username: { required: true, type: () => String, description: "\u7528\u6237\u540D" },
              password: { required: true, type: () => String, description: "\u5BC6\u7801", minLength: 6 },
              verifyCode: { required: true, type: () => Number, description: "\u9A8C\u8BC1\u7801", maximum: 999999 },
            },
          },
        ],
        [
          import("./modules/transport/dtos/transport/email/email.dto"),
          { SendEmailVerifyCodeBodyDTO: { email: { required: true, type: () => String, description: "\u90AE\u7BB1" } } },
        ],
        [
          import("./modules/transport/dtos/transport/email/email.res.dto"),
          {
            SendEmailVerifyCode429ResDTO: {
              statusCode: { required: true, type: () => Object, default: 429 },
              code: { required: true, type: () => Object, default: 1014 },
              message: { required: true, type: () => Object, default: "\u8BF7\u6C42\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5" },
            },
            SendEmailVerifyCode201ResDTO: {
              statusCode: { required: true, type: () => Object, default: 201 },
              code: { required: true, type: () => Object, default: 1012 },
              message: { required: true, type: () => Object, default: "\u53D1\u9001\u6210\u529F" },
            },
          },
        ],
        [
          import("./modules/user/dtos/user/logging/logging.res.dto"),
          {
            GetLoggingUser200ResDTODataUserDTO: {
              userID: { required: true, type: () => Number },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: true, type: () => Date },
              username: { required: true, type: () => String },
              ip: { required: true, type: () => String },
              saying: { required: true, type: () => String },
              email: { required: false, type: () => String },
              phone: { required: false, type: () => String },
            },
            GetLoggingUser200ResDTODataDTO: {
              user: { required: true, type: () => t["./modules/user/dtos/user/logging/logging.res.dto"].GetLoggingUser200ResDTODataUserDTO },
            },
            GetLoggingUser200ResDTO: {
              statusCode: { required: true, type: () => Number },
              code: { required: true, type: () => Number },
              message: { required: true, type: () => String },
              data: { required: true, type: () => t["./modules/user/dtos/user/logging/logging.res.dto"].GetLoggingUser200ResDTODataDTO },
            },
          },
        ],
        [
          import("./modules/user/dtos/user/avatar/avatar.dto"),
          { PutUserAvatarBodyDTO: { url: { required: true, type: () => String, description: "\u5934\u50CF\u5730\u5740" } } },
        ],
        [
          import("./modules/pay/dtos/pay/xunhupay/xunhupay.dto"),
          {
            PayControllerXunhupayBodyDTO: {
              amount: { required: true, type: () => Number, description: "\u652F\u4ED8\u91D1\u989D", minimum: 0.01 },
              type: {
                required: true,
                type: () => String,
                description:
                  "\u652F\u4ED8\u65B9\u5F0F xunhupayWechat \u8FC5\u864E\u5FAE\u4FE1\u652F\u4ED8 xunhupayAlipay \u8FC5\u864E\u652F\u4ED8\u5B9D\u652F\u4ED8",
                default: "xunhupayWechat",
              },
            },
          },
        ],
        [
          import("./modules/pay/dtos/pay/wechat/wechat.dto"),
          {
            PostPayWechatBodyDTO: {
              openid: { required: true, type: () => String, description: "\u7528\u6237\u7684openid" },
              amount: { required: true, type: () => Number, description: "\u91D1\u989D", minimum: 0.01 },
            },
          },
        ],
        [
          import("./modules/upyun/dtos/upyun/upload/image/image.dto"),
          { PostFileUploadImageDTO: { file: { required: true, type: () => Object, description: "\u591A\u5F20\u56FE\u7247" } } },
        ],
        [
          import("./modules/upyun/dtos/upyun/file.res.dto"),
          {
            UploadServiceListFileWrapperResponseResDTO: {
              statusCode: { required: true, type: () => Number, default: 200 },
              code: { required: true, type: () => Number, default: 1000 },
              message: { required: true, type: () => String, default: "\u6210\u529F" },
              data: { required: true, type: () => t["./modules/upyun/dtos/upyun/file.res.dto"].UploadServiceListFileWrapperResDTO },
            },
            UploadServiceListFileWrapperUpyunExtraDataResDTO: {
              next: { required: true, type: () => String },
              path: { required: true, type: () => String },
            },
            UploadServiceListFileWrapperResDTO: {
              list: { required: true, type: () => [t["./modules/upyun/dtos/upyun/file.res.dto"].UploadServiceListFileResDTO] },
              extraData: {
                required: true,
                type: () => t["./modules/upyun/dtos/upyun/file.res.dto"].UploadServiceListFileWrapperUpyunExtraDataResDTO,
              },
            },
            UploadServiceListFileResDTO: {
              name: { required: true, type: () => String, description: "\u6587\u4EF6\u540D" },
              type: { required: true, type: () => Object, description: "\u6587\u4EF6\u5939\u8FD8\u662F\u6587\u4EF6" },
            },
          },
        ],
        [
          import("./modules/upyun/dtos/upyun/file.dto"),
          {
            GetFileQueryDTO: {
              path: { required: true, type: () => String, description: "\u6587\u4EF6\u8DEF\u5F84" },
              next: { required: false, type: () => String, description: "\u4E0B\u4E00\u9875" },
            },
          },
        ],
      ],
      controllers: [
        [import("./app.controller"), { AppController: { getHello: { summary: "\u4E3B\u9875", type: Number } } }],
        [
          import("./modules/login/controllers/login.controller"),
          {
            LoginController: {
              loginByUsernamePassword: {
                summary: "\u901A\u8FC7\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55",
                type: t["./modules/login/dtos/login/username/password/login.post.res.dto"].LoginByUsernamePasswordDataOKResponseDTO,
              },
            },
          },
        ],
        [
          import("./modules/register/controllers/register.controller"),
          {
            RegisterController: { registerByEmailPassword: { summary: "\u901A\u8FC7\u90AE\u7BB1\u9A8C\u8BC1\u7801\u548C\u5BC6\u7801\u6CE8\u518C" } },
          },
        ],
        [
          import("./modules/transport/controllers/email.controller"),
          { EmailController: { sendEmailVerifyCode: { summary: "\u53D1\u9001\u90AE\u7BB1\u9A8C\u8BC1\u7801", type: Number } } },
        ],
        [
          import("./modules/user/controllers/user.controller"),
          {
            UserController: {
              getLoggingUser: { summary: "\u83B7\u53D6\u5DF2\u767B\u5F55\u7528\u6237\u4FE1\u606F" },
              updateAvatar: { summary: "\u66F4\u65B0\u5934\u50CF", type: Object },
            },
          },
        ],
        [
          import("./modules/pay/controllers/xunhupay.controller"),
          {
            XunhupayController: {
              pay: { summary: "\u8FC5\u864E\u652F\u4ED8" },
              notify: { summary: "\u8FC5\u864E\u5FAE\u4FE1\u652F\u4ED8\u56DE\u8C03 \u8BF7\u52FF\u8C03\u7528", type: String },
            },
          },
        ],
        [
          import("./modules/pay/controllers/wechat.controller"),
          {
            WechatController: {
              pay: { summary: "\u5B98\u65B9\u5FAE\u4FE1\u652F\u4ED8", type: Object },
              notify: { summary: "\u5B98\u65B9\u5FAE\u4FE1\u652F\u4ED8\u901A\u77E5\u63A5\u53E3 \u8BF7\u52FF\u624B\u52A8\u8C03\u7528" },
            },
          },
        ],
        [
          import("./modules/upyun/controllers/upyun.controller"),
          {
            UpyunController: {
              listFiles: { summary: "\u83B7\u53D6\u6587\u4EF6\u5217\u8868" },
              uploadImage: { summary: "\u4E0A\u4F20\u56FE\u7247", type: Object },
            },
          },
        ],
      ],
    },
  };
};
