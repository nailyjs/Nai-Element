"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
const _fs = require("fs");
const _metadata = /*#__PURE__*/ _interop_require_default(require("./metadata"));
const _core = require("@nestjs/core");
const _appmodule = require("./app.module");
const _config = require("@nestjs/config");
const _swagger = require("@nestjs/swagger");
const _ccnailyelementshared = require("cc.naily.element.shared");
function _interop_require_default(obj) {
  return obj && obj.__esModule
    ? obj
    : {
        default: obj,
      };
}
(async function bootstrap() {
  console.clear();
  const app = await _core.NestFactory.create(_appmodule.AppModule, {
    snapshot: true,
    logger: new _ccnailyelementshared.CommonLogger(),
    cors: {
      origin: "*",
    },
  });
  app.useLogger(await app.resolve(_ccnailyelementshared.CommonLogger));
  const configService = app.get(_config.ConfigService);
  const port = configService.getOrThrow("shop.port");
  const name = configService.getOrThrow("shop.name");
  // Swagger
  await _swagger.SwaggerModule.loadPluginMetadata(_metadata.default);
  const [openAPIObject, generate] = (0, _ccnailyelementshared.EnableSwagger)(app, (builder) => {
    return builder.setTitle(name).setDescription((0, _fs.readFileSync)("./DESC.md").toString("utf-8"));
  });
  generate("passport.openapi.json", openAPIObject).then();
  await app.listen(port);
  return app;
})().then(async (app) => {
  new _ccnailyelementshared.CommonLogger("NestApplication").verbose(`Passport app is running on ${await app.getUrl()}`);
});

//# sourceMappingURL=main.js.map
