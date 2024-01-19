"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
Object.defineProperty(exports, "AppController", {
  enumerable: true,
  get: function () {
    return AppController;
  },
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
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
let AppController = class AppController {
  /**
   * 主页
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/18
   * @return {*}  {string}
   * @memberof AppController
   */ getHello() {
    return 1000;
  }
};
_ts_decorate(
  [
    (0, _common.Get)(),
    (0, _common.UseInterceptors)(_ccnailyelementshared.ResInterceptor),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Number),
  ],
  AppController.prototype,
  "getHello",
  null,
);
AppController = _ts_decorate([(0, _swagger.ApiTags)("主页"), (0, _common.Controller)()], AppController);

//# sourceMappingURL=app.controller.js.map