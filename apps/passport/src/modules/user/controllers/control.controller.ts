import { Body, Controller, Put, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Auth, User } from "cc.naily.element.auth";
import { UserControlService } from "../providers/control.service";
import { User as UserEntity } from "cc.naily.element.database";
import { PutUserControlBodyDTO } from "../dtos/user/control/control.dto";
import { ResInterceptor, UpdateIpInterceptor } from "cc.naily.element.shared";

@ApiTags("用户权限")
@Controller("user/control")
export class UserControlController {
  constructor(private readonly userControlService: UserControlService) {}

  /**
   * 更新邮箱公开状态
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/01
   * @memberof UserControlController
   */
  @Auth()
  @Put("email")
  @UseInterceptors(ResInterceptor, UpdateIpInterceptor)
  public updateEmailControl(@Body() body: PutUserControlBodyDTO, @User() user: UserEntity) {
    return this.userControlService.updateEmailControl(body.isPublic, user.userID);
  }

  /**
   * 更新手机号公开状态
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/01
   * @param {PutUserControlBodyDTO} body
   * @param {UserEntity} user
   * @memberof UserControlController
   */
  @Auth()
  @Put("phone")
  @UseInterceptors(ResInterceptor, UpdateIpInterceptor)
  public updatePhoneControl(@Body() body: PutUserControlBodyDTO, @User() user: UserEntity) {
    return this.userControlService.updatePhoneControl(body.isPublic, user.userID);
  }

  /**
   * 更新商品评价喜欢公开状态
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/01
   * @param {PutUserControlBodyDTO} body
   * @param {UserEntity} user
   * @return {*}
   * @memberof UserControlController
   */
  @Auth()
  @Put("evaluate-like")
  @UseInterceptors(ResInterceptor, UpdateIpInterceptor)
  public updateEvaluateLike(@Body() body: PutUserControlBodyDTO, @User() user: UserEntity) {
    return this.userControlService.updateEvaluateLike(body.isPublic, user.userID);
  }
}
