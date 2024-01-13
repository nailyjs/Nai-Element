import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { AxiosError } from "axios";
import { I18nTranslations } from "cc.naily.element.generated";
import { Response } from "express";
import { I18nService } from "nestjs-i18n";
import { CommonLogger } from "../modules/logger";

@Catch(AxiosError)
export class CommonAxiosFilter implements ExceptionFilter {
  constructor(private readonly i18nService: I18nService<I18nTranslations>) {}

  public catch(exception: AxiosError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();

    response.status(500).json({
      statusCode: 500,
      code: 0,
      message: this.i18nService.t("global.errorCode.1023"),
      timestamp: new Date(),
    });

    return new CommonLogger(CommonAxiosFilter.name).error(JSON.stringify(exception));
  }
}
