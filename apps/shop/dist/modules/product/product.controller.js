"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
Object.defineProperty(exports, "ProductController", {
  enumerable: true,
  get: function () {
    return ProductController;
  },
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _ccnailyelementdatabase = require("cc.naily.element.database");
const _productdto = require("./dtos/product/product.dto");
const _ccnailyelementshared = require("cc.naily.element.shared");
function _ts_decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
let ProductController = class ProductController {
  /**
   * 获取商品列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/19
   * @memberof ProductController
   */ listProduct(query) {
    if (typeof query.filterTags === "string") query.filterTags = [query.filterTags];
    return this.shopProductRepository.find({
      cache: true,
      order: {
        productID: query.orderTime === "oldtest" ? "ASC" : "DESC",
      },
      where: (query.filterTags || []).map((item) => {
        return {
          productStatus: "up",
          productTags: {
            productTagID: item,
          },
        };
      }),
    });
  }
  constructor(shopProductRepository) {
    this.shopProductRepository = shopProductRepository;
  }
};
_ts_decorate(
  [
    (0, _common.Get)(),
    (0, _common.UseInterceptors)(_ccnailyelementshared.ResInterceptor),
    _ts_param(0, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [typeof _productdto.GetProductDTO === "undefined" ? Object : _productdto.GetProductDTO]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise),
  ],
  ProductController.prototype,
  "listProduct",
  null,
);
ProductController = _ts_decorate(
  [
    (0, _swagger.ApiTags)("产品"),
    (0, _common.Controller)("product"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
      typeof _ccnailyelementdatabase.ShopProductRepository === "undefined" ? Object : _ccnailyelementdatabase.ShopProductRepository,
    ]),
  ],
  ProductController,
);

//# sourceMappingURL=product.controller.js.map
