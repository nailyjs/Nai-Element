import { DynamicModule, Module } from "@nestjs/common";
import { join } from "path";
import { ConfigService } from "@nestjs/config";
import { AcceptLanguageResolver, I18nModule, QueryResolver } from "nestjs-i18n";

@Module({})
export class CommonI18nModule {
  /**
   * 注册国际化模块
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/08
   * @static
   * @return {DynamicModule}
   * @memberof CommonI18nModule
   */
  public static forRoot(): DynamicModule {
    return I18nModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const defaultLanguage = configService.get("global.defaultLanguage");
        return {
          fallbackLanguage: defaultLanguage ? defaultLanguage : "zh",
          loaderOptions: {
            path: join(process.env.RESOURCE_ROOT, "/i18n/"),
            watch: true,
          },
          typesOutputPath: join(process.env.PROJECT_ROOT, "libraries/generated/src/i18n.generated.ts"),
        };
      },
      resolvers: [
        AcceptLanguageResolver,
        {
          use: QueryResolver,
          options: ["lang", "locale"],
        },
      ],
    });
  }
}
