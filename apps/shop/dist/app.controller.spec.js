"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
const _testing = require("@nestjs/testing");
const _appcontroller = require("./app.controller");
const _appmodule = require("./app.module");
describe("AppController", () => {
  let appController;
  beforeEach(async () => {
    const app = await _testing.Test.createTestingModule({
      imports: [_appmodule.AppModule],
      controllers: [_appcontroller.AppController],
    }).compile();
    appController = app.get(_appcontroller.AppController);
  });
  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe(1000);
    });
  });
});

//# sourceMappingURL=app.controller.spec.js.map
