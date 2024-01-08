import { DynamicModule } from "@nestjs/common";

export class BusinessModule {
  /**
   * 注册模块
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/08
   * @static
   * @return {DynamicModule}
   * @memberof BusinessModule
   */
  public static register(): DynamicModule {
    return {
      module: this,
      global: true,
    };
  }
}
