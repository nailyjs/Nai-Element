"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
Object.defineProperty(exports, "ProductModule", {
  enumerable: true,
  get: function () {
    return ProductModule;
  },
});
const _common = require("@nestjs/common");
const _ccnailyelementshared = require("cc.naily.element.shared");
const _productcontroller = require("./product.controller");
const _ccnailyelementdatabase = require("cc.naily.element.database");
function _ts_decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ProductModule = class ProductModule extends _ccnailyelementshared.BusinessModule {};
ProductModule = _ts_decorate(
  [
    (0, _common.Module)({
      controllers: [_productcontroller.ProductController],
      providers: [_ccnailyelementdatabase.ShopProductRepository],
    }),
  ],
  ProductModule,
);

//# sourceMappingURL=product.module.js.map
