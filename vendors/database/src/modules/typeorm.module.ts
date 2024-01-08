import "cc.naily.element.shared";
import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { join } from "path";

@Module({})
export class CommonTypeOrmModule {
  /**
   * 注册主数据库模块
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/08
   * @static
   * @return {DynamicModule}
   * @memberof CommonTypeOrmModule
   */
  public static forRoot(): DynamicModule {
    return TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const mysql = configService.get("global.datasource.mysql") || {};
        return {
          type: "mysql",
          host: mysql.host,
          port: mysql.port,
          username: mysql.username,
          password: mysql.password,
          database: mysql.database,
          entityPrefix: mysql.entityPrefix,
          logging: true,
          autoLoadEntities: true,
          entities: [join(process.env.RESOURCE_ROOT, "**/*/cjs/**/*.entity.js")],
          subscribers: [join(process.env.RESOURCE_ROOT, "**/*/cjs/**/*.subscriber.js")],
        };
      },
    });
  }
}
