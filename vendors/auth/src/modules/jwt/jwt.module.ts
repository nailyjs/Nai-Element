import { DynamicModule, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({})
export class CommonJwtModule {
  /**
   * 注册JWT模块
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/08
   * @static
   * @return {DynamicModule}
   * @memberof CommonJwtModule
   */
  public static forRoot(): DynamicModule {
    return JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      async useFactory(configService: ConfigService) {
        const secret = configService.getOrThrow("global.jwt.secret");
        const expiresIn = configService.getOrThrow("global.jwt.expiresIn");
        return {
          global: true,
          secret: secret,
          signOptions: {
            expiresIn: expiresIn ? expiresIn : "30d",
          },
        };
      },
    });
  }
}
