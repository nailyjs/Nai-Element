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

export class GetLoggingUser200ResDTODataUserDTO {
  userID: number;

  createdAt: Date;

  updatedAt: Date;

  username: string;

  ip: string;

  saying: string;

  email?: string;

  phone?: string;
}

export class GetLoggingUser200ResDTODataDTO {
  user: GetLoggingUser200ResDTODataUserDTO;
}

@DTO()
@DTOStatus(200)
@DTODescription(200, "获取已登录用户信息成功")
export class GetLoggingUser200ResDTO {
  statusCode: number;

  code: number;

  message: string;

  data: GetLoggingUser200ResDTODataDTO;
}
