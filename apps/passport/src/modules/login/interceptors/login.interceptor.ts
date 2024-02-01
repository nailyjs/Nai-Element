import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { CommonLogger } from "cc.naily.element.shared";
import { map } from "rxjs";

@Injectable()
export class LoginInterceptor implements NestInterceptor {
  constructor(private readonly commonLogger: CommonLogger) {
    commonLogger.setContext(LoginInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    this.commonLogger.warn(`发送了一个登录请求`);
    return next.handle().pipe(
      map((data) => {
        this.commonLogger.log(`用户登录成功`);
        return data;
      }),
    );
  }
}
