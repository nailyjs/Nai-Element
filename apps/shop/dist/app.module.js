"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
Object.defineProperty(exports, "AppModule", {
  enumerable: true,
  get: function () {
    return AppModule;
  },
});
const _common = require("@nestjs/common");
const _appcontroller = require("./app.controller");
const _ccnailyelementshared = /*#__PURE__*/ _interop_require_wildcard(require("cc.naily.element.shared"));
const _ccnailyelementvalidator = require("cc.naily.element.validator");
const _core = require("@nestjs/core");
const _productmodule = require("./modules/product/product.module");
const _ccnailyelementdatabase = require("cc.naily.element.database");
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return {
      default: obj,
    };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {
    __proto__: null,
  };
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
function _ts_decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AppModule = class AppModule {};
AppModule = _ts_decorate(
  [
    (0, _common.Module)({
      imports: [
        _ccnailyelementshared.default.CommonConfigModule.forRoot(),
        _ccnailyelementshared.default.CommonI18nModule.forRoot(),
        _ccnailyelementshared.default.CommonThrottlerModule.forRoot(),
        _ccnailyelementshared.default.CommonMailerModule.forRoot(),
        _ccnailyelementshared.default.CommonErrorModule.forRoot(),
        _ccnailyelementshared.default.CommonCacheModule.forRoot(),
        _ccnailyelementshared.default.CommonDevModule.forRoot(),
        _ccnailyelementshared.default.CommonLoggerModule.forRoot(),
        _ccnailyelementdatabase.CommonTypeOrmModule.forRoot(),
        _productmodule.ProductModule.register(),
      ],
      controllers: [_appcontroller.AppController],
      providers: [
        {
          provide: _core.APP_GUARD,
          useClass: _ccnailyelementshared.ThrottlerBehindProxyGuard,
        },
        {
          provide: _core.APP_PIPE,
          useClass: _ccnailyelementvalidator.CommonValidationPipe,
        },
      ],
    }),
  ],
  AppModule,
);

//# sourceMappingURL=app.module.js.map
