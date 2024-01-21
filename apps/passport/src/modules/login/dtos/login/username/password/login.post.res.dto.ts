/*
 * Copyright (C) 2024 Zero naily.cc
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { DTO, DTODescription, DTOStatus } from "cc.naily.element.swagger";

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
