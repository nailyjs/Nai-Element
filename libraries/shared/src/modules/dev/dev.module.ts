import { DynamicModule, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DevtoolsModule } from "@nestjs/devtools-integration";

@Module({})
export class CommonDevModule {
  /**
   * 注册开发工具模块
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/08
   * @static
   * @return {DynamicModule}
   * @memberof CommonDevModule
   */
  public static forRoot(): DynamicModule {
    return DevtoolsModule.registerAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const devtool = configService.get("devtool") || {};
        const mode = process.env.NODE_ENV;
        return {
          http: typeof devtool.enable !== "boolean" ? mode === "development" : devtool.enable,
          port: devtool.port || 8000,
        };
      },
    });
  }
}
