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
              filterTags: { required: false, type: () => [Number], description: "\u8FC7\u6EE4\u6807\u7B7E" },
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
            },
          },
        ],
      ],
    },
  };
};
