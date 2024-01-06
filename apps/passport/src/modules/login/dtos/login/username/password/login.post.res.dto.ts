import { DTO, DTODescription, DTOStatus } from "cn.watchrss.element.swagger";

export class LoginByUsernamePasswordDataOKResponseDTO {
  /**
   * 用户信息
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @type {LoginByUsernamePasswordDataUserOKResponseDTO}
   * @memberof LoginByUsernamePasswordDataOKResponseDTO
   */
  user: LoginByUsernamePasswordDataUserOKResponseDTO;
  /**
   * 访问令牌
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @type {string}
   * @memberof LoginByUsernamePasswordDataOKResponseDTO
   */
  access_token: string;
}

export class LoginByUsernamePasswordDataUserOKResponseDTO {
  /**
   * 用户ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @type {number}
   * @memberof LoginByUsernamePasswordDataOKResponseDTO
   */
  userID: number = 1;
  /**
   * 注册时间
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @type {Date}
   * @memberof LoginByUsernamePasswordDataOKResponseDTO
   */
  createdAt: Date;
  /**
   * 更新时间
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @type {Date}
   * @memberof LoginByUsernamePasswordDataOKResponseDTO
   */
  updatedAt: Date;
  /**
   * 用户名
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @type {string}
   * @memberof LoginByUsernamePasswordDataOKResponseDTO
   */
  username: string = "Zero";
  /**
   * IP
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @type {string}
   * @memberof LoginByUsernamePasswordDataOKResponseDTO
   */
  ip: string = "0.0.0.0";
  /**
   * 个性签名
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @type {string}
   * @memberof LoginByUsernamePasswordDataOKResponseDTO
   */
  saying: string = "这个人很懒，什么都没有写哦";
  /**
   * 头像地址
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @type {string}
   * @memberof LoginByUsernamePasswordDataOKResponseDTO
   */
  avatar: string = "https://avatars.githubusercontent.com";
}

@DTO()
@DTOStatus(201)
@DTODescription(201, "登录成功")
export class LoginByUsernamePasswordOKResponseDTO {
  /**
   * HTTP状态码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @type {number}
   * @memberof LoginByUsernamePasswordOKResponseDTO
   */
  readonly statusCode: number = 201;
  /**
   * 系统状态码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @type {number}
   * @memberof LoginByUsernamePasswordOKResponseDTO
   */
  readonly code: number = 1000;
  /**
   * 信息
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @type {string}
   * @memberof LoginByUsernamePasswordOKResponseDTO
   */
  readonly message: string = "登录成功";
  /**
   * 数据
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/06
   * @type {LoginByUsernamePasswordDataOKResponseDTO}
   * @memberof LoginByUsernamePasswordOKResponseDTO
   */
  readonly data: LoginByUsernamePasswordDataOKResponseDTO;
}
