import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
import { Response } from "express";
import { I18nService } from "nestjs-i18n";

@Catch(HttpException)
export class CommonHttpFilter implements ExceptionFilter {
  constructor(private readonly i18nService: I18nService) {}

  public catch(exception: HttpException, host: ArgumentsHost): void {
    const status = exception.getStatus();
    const msg: unknown = exception.getResponse();
    const response = host.switchToHttp().getResponse<Response>();

    if (this.isNumber(msg) || typeof msg === "number") {
      response.status(status).json({
        statusCode: status,
        code: typeof msg !== "number" ? Number(msg) : msg,
        message: this.i18nService.t(`global.errorCode.${msg}`),
      });
      return new Logger(CommonHttpFilter.name).error(JSON.stringify(exception));
    }

    if (typeof msg === "string") {
      response.status(status).json({
        statusCode: status,
        code: 0,
        message: msg,
      });
      return new Logger(CommonHttpFilter.name).error(JSON.stringify(exception));
    }

    if (typeof msg === "object") {
      response.status(status).json({
        statusCode: status,
        code: msg["code"] || 0,
        message: msg["message"] || exception.message,
        ...msg,
      });
      return new Logger(CommonHttpFilter.name).error(JSON.stringify(exception));
    }
  }

  private isNumber(value: unknown): boolean {
    return !Number.isNaN(Number(value));
  }
}
