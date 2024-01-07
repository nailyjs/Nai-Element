import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { I18nTranslations } from "cc.naily.element.generated";
import { Response } from "express";
import { I18nService } from "nestjs-i18n";

@Catch(Error)
export class CommonUnknownFilter implements ExceptionFilter {
  constructor(private readonly i18nService: I18nService<I18nTranslations>) {}

  public catch(exception: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const responseMessage = {
      statusCode: 500,
      code: 999,
      message: this.i18nService.t(`global.errorCode.999`),
    };

    console.error(exception);
    new Logger("UnknownErrorFilter").error(`有未处理的错误被兜底 已经处理成500错误抛出 ${exception}`);
    new Logger("UnknownErrorFilter").error(`响应 ${JSON.stringify(responseMessage)}`);
    response.status(500).json(responseMessage);
  }
}
