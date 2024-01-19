/* eslint-disable */ "use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _default;
  },
});
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
const _default = async () => {
  const t = {};
  return {
    "@nestjs/swagger": {
      models: [
        [
          Promise.resolve().then(() => /*#__PURE__*/ _interop_require_wildcard(require("./modules/product/dtos/product/product.dto"))),
          {
            GetProductDTO: {
              orderTime: {
                required: false,
                type: () => Object,
                description: "\u6392\u5E8F\u65B9\u5F0F",
              },
              filterTags: {
                required: false,
                type: () => [Number],
                description: "\u8FC7\u6EE4\u6807\u7B7E",
              },
            },
          },
        ],
      ],
      controllers: [
        [
          Promise.resolve().then(() => /*#__PURE__*/ _interop_require_wildcard(require("./app.controller"))),
          {
            AppController: {
              getHello: {
                summary: "\u4E3B\u9875",
                type: Number,
              },
            },
          },
        ],
        [
          Promise.resolve().then(() => /*#__PURE__*/ _interop_require_wildcard(require("./modules/product/product.controller"))),
          {
            ProductController: {
              listProduct: {
                summary: "\u83B7\u53D6\u5546\u54C1\u5217\u8868",
                type: [Object],
              },
            },
          },
        ],
      ],
    },
  };
};

//# sourceMappingURL=metadata.js.map