import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { CommonLogger } from "cc.naily.element.shared";
import { Request } from "express";
import { map } from "rxjs";

@Injectable()
export class LoginInterceptor implements NestInterceptor {
  constructor(private readonly commonLogger: CommonLogger) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<Request>();
    this.commonLogger.warn(`发送了一个登录请求: ${JSON.stringify(request.user)}`);
    return next.handle().pipe(
      map((data) => {
        this.commonLogger.log(`用户登录成功: ${JSON.stringify(request.user)}`);
        return data;
      }),
    );
  }
}
