import { ClientRepository } from "@nailyjs.nest.modules/tencentcloud";
import { Body, Controller, Inject, Post, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";
import { sms } from "tencentcloud-sdk-nodejs";
import { PostTransportSmsBodyDTO } from "../dtos/transport/sms/sms.dto";
import { ResInterceptor } from "cc.naily.element.shared";
import { ConfigService } from "@nestjs/config";

@ApiTags("短信")
@Controller("transport/sms")
export class TencentSmsController {
  constructor(
    @Inject(sms.v20210111.Client)
    private readonly smsClient: ClientRepository<typeof sms.v20210111.Client>,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 发送短信
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/26
   * @param {PostTransportSmsBodyDTO} body
   * @memberof TencentSmsController
   */
  @Post()
  @UseInterceptors(ResInterceptor)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async send(@Body() body: PostTransportSmsBodyDTO) {
    const code = Math.floor(Math.random() * 1000000);
    const res = await this.smsClient.SendSms({
      SmsSdkAppId: this.configService.getOrThrow("global.tencent.cloud.sms.SmsSdkAppId"),
      TemplateId: this.configService.getOrThrow("global.tencent.cloud.sms.TemplateId"),
      SignName: this.configService.getOrThrow("global.tencent.cloud.sms.SignName"),
      TemplateParamSet: [`${code}`, "5"],
      PhoneNumberSet: [body.phone],
    });
    return res;
  }
}
