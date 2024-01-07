import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { LoginService } from "../providers/login.service";
import { LoginByUsernamePasswordDTO } from "../dtos/login/username/password/login.post.dto";
import { ApiTags } from "@nestjs/swagger";
import { ResInterceptor } from "cc.naily.element.shared";
import { LoginByUsernamePasswordDataOKResponseDTO, LoginByUsernamePasswordOKResponseDTO } from "../dtos/login/username/password/login.post.res.dto";
import { SwaggerResponse } from "cc.naily.element.swagger";

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
   * @returns {Promise<LoginByUsernamePasswordDataOKResponseDTO>} 登录成功信息
   * @memberof LoginController
   */
  @Post("username/password")
  @UseInterceptors(ResInterceptor)
  @SwaggerResponse(LoginByUsernamePasswordOKResponseDTO)
  public loginByUsernamePassword(@Body() body: LoginByUsernamePasswordDTO): Promise<LoginByUsernamePasswordDataOKResponseDTO> {
    return this.loginService.loginByUsernamePassword(body.username, body.password);
  }
}
