import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DevtoolsModule } from "@nestjs/devtools-integration";

@Module({})
export class CommonDevModule {
  public static forRoot() {
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
