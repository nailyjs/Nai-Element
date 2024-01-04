import "cn.watchrss.element.shared";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { join } from "path";

@Module({})
export class CommonTypeOrmModule {
  public static forRoot() {
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
          entities: [join(process.env.RESOURCE_ROOT, "dist/**/*.entity.js")],
          subscribers: [join(process.env.RESOURCE_ROOT, "dist/**/*.subscriber.js")],
        };
      },
    });
  }
}
