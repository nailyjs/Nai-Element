/* eslint-disable */
export default async () => {
  const t = {};
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
          { BrowserMarkController: { getList: { summary: "\u83B7\u53D6\u5386\u53F2\u8BB0\u5F55", type: Object }, create: { type: Object } } },
        ],
      ],
    },
  };
};
