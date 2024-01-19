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
              orderTime: { required: false, type: () => Object, description: "\u6392\u5E8F\u65B9\u5F0F" },
              filterTags: { required: false, type: () => [Number], description: "\u8FC7\u6EE4\u6807\u7B7E" },
            },
          },
        ],
      ],
      controllers: [
        [import("./app.controller"), { AppController: { getHello: { summary: "\u4E3B\u9875", type: Number } } }],
        [
          import("./modules/product/product.controller"),
          { ProductController: { listProduct: { summary: "\u83B7\u53D6\u5546\u54C1\u5217\u8868", type: [Object] } } },
        ],
      ],
    },
  };
};
