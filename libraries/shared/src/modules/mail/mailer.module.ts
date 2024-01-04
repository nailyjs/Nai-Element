import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";

@Module({})
export class CommonMailerModule {
  public static forRoot() {
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
