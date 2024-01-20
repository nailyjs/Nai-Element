/* eslint-disable */
export default async () => {
  const t = {};
  return {
    "@nestjs/swagger": {
      models: [
        [
          import("./modules/product/dtos/product/product.dto"),
          {
            GetProductDTO: {
              orderTime: { required: false, type: () => Object, description: "\u65F6\u95F4\u6392\u5E8F", default: "latest" },
              orderHot: { required: false, type: () => Object, description: "\u70ED\u5EA6\u6392\u5E8F", default: "hottest" },
              orderPrice: { required: false, type: () => Object, description: "\u4EF7\u683C\u6392\u5E8F", default: "highest" },
              orderSold: { required: false, type: () => Object, description: "\u9500\u91CF\u6392\u5E8F", default: "highest" },
              orderStock: { required: false, type: () => Object, description: "\u5E93\u5B58\u6392\u5E8F", default: "highest" },
              filterTags: { required: false, type: () => [Number], description: "\u8FC7\u6EE4\u6807\u7B7E" },
              filterUser: { required: false, type: () => [Number], description: "\u8FC7\u6EE4\u7528\u6237" },
              take: { required: false, type: () => Number, description: "\u53D6\u5230\u6570\u91CF", default: 10 },
              skip: { required: false, type: () => Number, description: "\u8DF3\u8FC7\u6570\u91CF", default: 0 },
            },
            PostCreateProductDTO: {
              productName: { required: true, type: () => String, description: "\u5546\u54C1\u540D\u79F0" },
              productIntroduction: { required: true, type: () => String, description: "\u5546\u54C1\u63CF\u8FF0" },
              productPrice: { required: true, type: () => Number, description: "\u5546\u54C1\u91D1\u989D \u5355\u4F4D\u5206" },
              productDiscountPrice: {
                required: false,
                type: () => Number,
                description: "\u5546\u54C1\u6298\u6263\u4EF7 \u5355\u4F4D\u5206 \u53EF\u9009\uFF08\u6216\u8005\u4F20\u51650\uFF09",
                default: 0,
              },
              productStock: { required: true, type: () => Number, description: "\u5E93\u5B58\u6570\u91CF", default: 0, minimum: 0 },
              productTags: { required: true, type: () => [Number], description: "\u5546\u54C1\u6807\u7B7E" },
              productStatus: {
                required: true,
                type: () => Boolean,
                description: "\u5546\u54C1\u72B6\u6001 \u7ACB\u5373\u4E0A\u67B6\u8BF7\u586Btrue\uFF0C\u6682\u4E0D\u4E0A\u67B6\u8BF7\u586Bfalse",
                default: true,
              },
            },
            PostSearchProductDTO: { keyword: { required: true, type: () => String, description: "\u641C\u7D22\u5173\u952E\u5B57" } },
            DeletedeleteProductDTO: { productID: { required: true, type: () => Object, description: "\u5546\u54C1id" } },
          },
        ],
        [
          import("./modules/subscribe/dtos/subscribe/subscribe.dto"),
          {
            PostSubscribeBodyDTO: {
              title: { required: true, type: () => String, description: "\u5546\u54C1\u6807\u9898" },
              introduction: { required: true, type: () => String, description: "\u5546\u54C1\u4ECB\u7ECD" },
              duration: { required: true, type: () => Number, description: "\u5546\u54C1\u65F6\u957F\uFF08\u5929\uFF09" },
              price: { required: true, type: () => Number, description: "\u5546\u54C1\u4EF7\u683C\uFF08\u5143\uFF09" },
            },
            PutSubscribeBodyDTO: { subscribeID: { required: true, type: () => Number, description: "\u8BA2\u9605\u5236\u5546\u54C1ID" } },
            getSubscribeUserStatusQueryDTO: { subscribeID: { required: true, type: () => Number, description: "\u8BA2\u9605\u5236\u5546\u54C1ID" } },
          },
        ],
      ],
      controllers: [
        [import("./app.controller"), { AppController: { getHello: { summary: "\u4E3B\u9875", type: Number } } }],
        [
          import("./modules/product/product.controller"),
          {
            ProductController: {
              listProduct: { summary: "\u83B7\u53D6\u5546\u54C1\u5217\u8868", type: [Object] },
              createProduct: { summary: "\u521B\u5EFA\u5546\u54C1", type: Object },
              searchProduct: { summary: "\u641C\u7D22\u5546\u54C1" },
              deleteProduct: { summary: "\u5220\u9664\u5546\u54C1", type: Boolean },
            },
          },
        ],
        [
          import("./modules/subscribe/controllers/subscribe.controller"),
          {
            SubscribeController: {
              getSubscribeList: { summary: "\u83B7\u53D6\u8BA2\u9605\u5236\u5546\u54C1\u5217\u8868", type: Object },
              getSubscribeSingle: { summary: "\u6839\u636E`subscribeID`\u83B7\u53D6\u5355\u4E2A\u8BA2\u9605\u5236\u5546\u54C1", type: Object },
              createSubscribe: { summary: "\u521B\u5EFA\u4E00\u4E2A\u8BA2\u9605\u5236\u7684\u5546\u54C1", type: Object },
              subscribe: { summary: "\u8BA2\u9605\u4E00\u4E2A\u8BA2\u9605\u5236\u7684\u5546\u54C1", type: Object },
              getSubscribeStatus: {
                summary: "\u83B7\u53D6\u5F53\u524D\u7528\u6237\u67D0\u4E2A\u8BA2\u9605\u5236\u5546\u54C1\u7684\u8BA2\u9605\u72B6\u6001",
                type: Object,
              },
            },
          },
        ],
      ],
    },
  };
};
