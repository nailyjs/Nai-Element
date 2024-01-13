import { BadRequestException, Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { XunhupayService } from "../providers/xunhupay.service";
import { ApiTags } from "@nestjs/swagger";
import { PayControllerXunhupayBodyDTO } from "../dtos/pay/wx/xunhupay.dto";
import { ResInterceptor } from "cc.naily.element.shared";
import { XunhupayNotify } from "../interfaces/xunhupay.interface";
import { User as UserEntity, UserOrderRepository } from "cc.naily.element.database";
import { Auth, User } from "cc.naily.element.auth";
import { PayService } from "../providers/pay.service";

@ApiTags("充值")
@Controller("pay/xunhupay")
export class XunhupayController {
  constructor(
    private readonly xunhupayService: XunhupayService,
    private readonly payService: PayService,
    private readonly userOrderRepository: UserOrderRepository,
  ) {}

  /**
   * 迅虎支付
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @memberof WechatController
   */
  @Post()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public async xunhupay(@User() user: Omit<UserEntity, "password">, @Body() { amount, type }: PayControllerXunhupayBodyDTO) {
    const data = await this.xunhupayService.xunhupay(amount, type as "xunhupayWechat" | "xunhupayAlipay");
    // 在数据库里创建订单
    await this.userOrderRepository.createOrder(
      user,
      data.trade_order_id.toString(),
      this.payService.handleMoney(amount),
      "xunhupayWechat",
      "pending",
    );
    data.trade_order_id = undefined;
    return data;
  }

  /**
   * 迅虎微信支付回调 请勿调用
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @param {*} body
   * @memberof PayController
   */
  @Post("notify")
  public async xunhupayNotify(@Body() body: XunhupayNotify) {
    const updated = await this.userOrderRepository.updateStatus(body.trade_order_id);
    if (!updated) throw new BadRequestException(1022);
    return "success";
  }
}
