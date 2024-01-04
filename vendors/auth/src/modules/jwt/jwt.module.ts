import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({})
export class CommonJwtModule {
  public static forRoot() {
    return JwtModule.registerAsync({
      inject: [ConfigService],
      async useFactory(configService: ConfigService) {
        const secret = configService.get("global.jwt.secret");

        return {
          global: true,
          secret: secret,
        };
      },
    });
  }
}
