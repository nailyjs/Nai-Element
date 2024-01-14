import { Body, Controller, Ip, Post, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { WechatService } from "../providers/wechat.service";
import { UserOrderRepository } from "cc.naily.element.database";
import { Auth, User } from "cc.naily.element.auth";
import { User as UserEntity } from "cc.naily.element.database";
import { ConfigService } from "@nestjs/config";
import { PayService } from "../providers/pay.service";
import { PostPayWechatBodyDTO } from "../dtos/pay/wechat/wechat.dto";
import { ResInterceptor } from "cc.naily.element.shared";

@ApiTags("充值")
@Controller("pay/wechat")
export class WechatController {
  constructor(
    private readonly payService: PayService,
    private readonly wechatService: WechatService,
    private readonly userOrderRepository: UserOrderRepository,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 官方微信支付
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/14
   * @memberof WechatController
   */
  @Post()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public async wechat(@Body() { openid, amount }: PostPayWechatBodyDTO, @User() user: Omit<UserEntity, "password">, @Ip() ip: string) {
    const data = await this.wechatService.pay(openid, user.userID, this.configService.getOrThrow("global.pay.wechat.name"), amount, ip);
    // 在数据库里创建订单
    await this.userOrderRepository.createOrder(user, data.trade_order_id.toString(), this.payService.handleMoney(amount), "wechat", "pending");
    return data.response_data;
  }

  /**
   * 支付通知接口 请勿手动调用
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/15
   * @param {Record<string, any>} { ciphertext, associated_data, nonce }
   * @memberof WechatController
   */
  @Post("notify")
  public async notify(@Body() { ciphertext, associated_data, nonce }: Record<string, any>) {
    const data = await this.wechatService.notify(ciphertext, associated_data, nonce);
    if (!data) {
      return {
        code: "FAIL",
        message: "支付失败",
      };
    }
    return;
  }
}
