import { DynamicModule, Module } from "@nestjs/common";
import { LoginController } from "./controllers/login.controller";
import { LoginService } from "./providers/login.service";
import { UserRepository } from "cc.naily.element.database";
import { BusinessModule } from "cc.naily.element.shared";

@Module({
  imports: [],
  controllers: [LoginController],
  providers: [LoginService, UserRepository],
})
export class LoginModule extends BusinessModule {
  /**
   * 注册登陆模块
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/08
   * @static
   * @return {DynamicModule}
   * @memberof LoginModule
   */
  public static register(): DynamicModule {
    return super.register();
  }
}
