// throttler-behind-proxy.guard.ts
import { ThrottlerException as ParentThrottlerException, ThrottlerGuard } from "@nestjs/throttler";
import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { ThrottlerLimitDetail } from "@nestjs/throttler/dist/throttler.guard.interface";

class ThrottlerException extends ParentThrottlerException {
  constructor(errorCode: number) {
    super(errorCode as unknown as string);
  }
}

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard implements CanActivate {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    return req.ips.length ? req.ips[0] : req.ip; // individualize IP extraction to meet your own needs
  }

  protected async throwThrottlingException(context: ExecutionContext, throttlerLimitDetail: ThrottlerLimitDetail): Promise<void> {
    const errorMessage = await super.getErrorMessage(context, throttlerLimitDetail);
    new Logger("ThrottlerException").error(errorMessage);
    throw new ThrottlerException(1014);
  }
}
