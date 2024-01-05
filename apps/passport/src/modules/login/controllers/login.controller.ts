import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { LoginService } from "../providers/login.service";
import { LoginByUsernamePasswordDTO } from "../dtos/login.dto";
import { ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiTags } from "@nestjs/swagger";
import { ResInterceptor } from "cn.watchrss.element.shared";
import { LoginByUsernamePasswordOKResponseDTO } from "../dtos/login.res.dto";

@ApiTags("登录")
@Controller("login")
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  /**
   * 通过用户名密码登录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/05
   * @param {LoginByUsernamePasswordDTO} body - 登录信息
   * @memberof LoginController
   */
  @Post("username/password")
  @UseInterceptors(ResInterceptor)
  @ApiCreatedResponse({
    description: "登录成功",
    type: LoginByUsernamePasswordOKResponseDTO,
  })
  @ApiForbiddenResponse({ description: "密码错误" })
  @ApiNotFoundResponse({ description: "用户不存在" })
  @ApiInternalServerErrorResponse({ description: "服务器内部错误" })
  public loginByUsernamePassword(@Body() body: LoginByUsernamePasswordDTO) {
    return this.loginService.loginByUsernamePassword(body.username, body.password);
  }
}
