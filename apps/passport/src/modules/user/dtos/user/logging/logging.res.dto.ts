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
