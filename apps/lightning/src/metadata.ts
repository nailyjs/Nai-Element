/* eslint-disable */
export default async () => {
  const t = {
    ["./modules/broswer/dtos/broswer/broswermark/broswermark.dto"]: await import("./modules/broswer/dtos/broswer/broswermark/broswermark.dto"),
  };
  return {
    "@nestjs/swagger": {
      models: [
        [
          import("./modules/broswer/dtos/broswer/broswertrack/broswertrack.dto"),
          {
            GetBrowserTrackListQueryDTO: {
              take: { required: false, type: () => Number, description: "\u6BCF\u9875\u6570\u91CF", default: 10 },
              skip: { required: false, type: () => Number, description: "\u8DF3\u8FC7\u6570\u91CF", default: 0 },
            },
            PostBrowserTrackBodyDTO: {
              updatedAt: { required: false, type: () => Date },
              webPageTitle: { required: true, type: () => String },
              webPageLink: { required: true, type: () => String },
            },
          },
        ],
        [
          import("./modules/broswer/dtos/broswer/broswermark/broswermark.dto"),
          {
            PostBrowserMarkQueryDTO: {
              take: { required: true, type: () => Number, description: "\u6BCF\u9875\u6570\u91CF" },
              skip: { required: true, type: () => Number, description: "\u8DF3\u8FC7\u6570\u91CF" },
            },
            PostBrowserMarkBodyDTO: {
              list: {
                required: true,
                type: () => [t["./modules/broswer/dtos/broswer/broswermark/broswermark.dto"].PostBrowserMarkBodyListDTO],
                description: "\u5217\u8868",
              },
            },
            PostBrowserMarkBodyListDTO: {
              title: { required: true, type: () => String, description: "\u6807\u9898" },
              icon: { required: true, type: () => String, description: "\u56FE\u6807" },
              color: { required: true, type: () => String, description: "\u989C\u8272" },
              link: { required: true, type: () => String, description: "\u94FE\u63A5" },
              index: { required: true, type: () => Number, description: "\u7D22\u5F15" },
            },
          },
        ],
        [
          import("./modules/apple/dtos/user/status/status.dto"),
          { GetSubscribeAppleUserStatusDTO: { transactionId: { required: true, type: () => String, description: "\u82F9\u679CtransactionId" } } },
        ],
        [
          import("./modules/apple/dtos/check/check.dto"),
          {
            GetSubscribeAppleCheckBodyDTO: {
              bundleId: { required: true, type: () => String, description: "\u82F9\u679C\u5E94\u7528\u7684bundleId" },
              transactionId: { required: true, type: () => String, description: "\u82F9\u679C\u5E94\u7528\u7684transactionId" },
              isSandbox: {
                required: false,
                type: () => Boolean,
                description: "\u662F\u5426\u662F\u6C99\u76D2\u73AF\u5883 \u9ED8\u8BA4false",
                default: false,
              },
            },
          },
        ],
      ],
      controllers: [
        [import("./app.controller"), { AppController: { getHello: { summary: "\u4E3B\u9875", type: Number } } }],
        [
          import("./modules/broswer/track.controller"),
          {
            BrowserTrackController: {
              getList: { summary: "\u83B7\u53D6\u5386\u53F2\u8BB0\u5F55", type: Object },
              create: { summary: "\u521B\u5EFA\u5386\u53F2\u8BB0\u5F55", type: Object },
              delete: { summary: "\u5220\u9664\u5386\u53F2\u8BB0\u5F55", type: Number },
              deleteAll: { type: Number },
            },
          },
        ],
        [
          import("./modules/broswer/mark.controller"),
          {
            BrowserMarkController: {
              getList: { summary: "\u83B7\u53D6\u6240\u6709\u4E66\u7B7E", type: Object },
              create: { summary: "\u66F4\u65B0\u6240\u6709\u4E66\u7B7E", type: Object },
            },
          },
        ],
        [
          import("./modules/apple/apple.controller"),
          {
            AppleController: {
              getUserStatus: { summary: "\u83B7\u53D6\u82F9\u679C\u8BA2\u9605\u72B6\u6001", type: Object },
              checkPay: { summary: "\u68C0\u67E5\u82F9\u679C\u8BA2\u9605\u72B6\u6001", type: Object },
              linkTransactionID: { summary: "\u94FE\u63A5TransactionID\u5230\u82F9\u679C\u8BA2\u9605", type: Object },
            },
          },
        ],
      ],
    },
  };
};
