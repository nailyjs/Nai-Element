import { DynamicModule, Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";

@Module({})
export class CommonMailerModule {
  /**
   * 邮件模块
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/08
   * @static
   * @return {DynamicModule}
   * @memberof CommonMailerModule
   */
  public static forRoot(): DynamicModule {
    return MailerModule.forRootAsync({
      inject: [ConfigService],
      async useFactory(configService: ConfigService) {
        return {
          transport: configService.get<string>("global.email.transport"),
          defaults: {
            from: configService.get<string>("global.email.from"),
          },
        };
      },
    });
  }
}
