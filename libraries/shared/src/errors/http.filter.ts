import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";
import { I18nService } from "nestjs-i18n";
import { CommonLogger } from "../modules/logger";

@Catch(HttpException)
export class CommonHttpFilter implements ExceptionFilter {
  constructor(
    private readonly i18nService: I18nService,
    private readonly commonLogger: CommonLogger,
  ) {}

  public catch(exception: HttpException, host: ArgumentsHost): void {
    this.commonLogger.setContext(CommonHttpFilter.name);

    const status = exception.getStatus();
    const msg: unknown = exception.getResponse();
    const response = host.switchToHttp().getResponse<Response>();

    if (this.isNumber(msg) || typeof msg === "number") {
      response.status(status).json({
        statusCode: status,
        code: typeof msg !== "number" ? Number(msg) : msg,
        message: this.i18nService.t(`global.errorCode.${msg}`),
        timestamp: new Date(),
      });

      return this.commonLogger.error(JSON.stringify(exception));
    }

    if (typeof msg === "string") {
      response.status(status).json({
        statusCode: status,
        code: 0,
        message: msg,
        timestamp: new Date(),
      });
      return this.commonLogger.error(JSON.stringify(exception));
    }

    if (typeof msg === "object") {
      response.status(status).json({
        statusCode: status,
        code: msg["code"] || 0,
        message: msg["message"] || exception.message,
        timestamp: new Date(),
        ...msg,
      });
      return this.commonLogger.error(JSON.stringify(exception));
    }
  }

  private isNumber<T>(value: T): boolean {
    return !Number.isNaN(Number(value));
  }
}
