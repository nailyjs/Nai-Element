import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class CommonHttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const status = exception.getStatus();
    const response = host.switchToHttp().getResponse<Response>();
    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
