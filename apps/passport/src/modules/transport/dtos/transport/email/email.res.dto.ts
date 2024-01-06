import { DTO, DTODescription, DTOStatus } from "cn.watchrss.element.swagger";

@DTO()
@DTOStatus(429)
@DTODescription(429, `请求过于频繁 目前后端限制的是每60秒最多5次 后端虽然兜了底但是仍请前端自行做好限制`)
export class SendEmailVerifyCode429ResDTO {
  statusCode = 429;
  code = 1014;
  message = "请求过于频繁，请稍后再试";
}

@DTO()
@DTOStatus(201)
@DTODescription(201, "发送成功")
export class SendEmailVerifyCode201ResDTO {
  statusCode = 201;
  code = 1012;
  message = "发送成功";
}
