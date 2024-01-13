import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { I18nPath, I18nTranslations } from "cc.naily.element.generated";
import { I18nService } from "nestjs-i18n";
import { map } from "rxjs";

@Injectable()
export class ResInterceptor implements NestInterceptor {
  constructor(private readonly i18nService: I18nService<I18nTranslations>) {}

  private isNumber(value: unknown): boolean {
    return !Number.isNaN(Number(value));
  }

  public intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((d) => {
        if (typeof d === "object" && (typeof d.statusCode === "number" || typeof d.message === "string" || typeof d.code === "number")) {
          return {
            statusCode: typeof d.statusCode === "number" ? d.statusCode : 200,
            code: typeof d.code === "number" ? d.code : 0,
            message: typeof d.message === "number" ? d.message : "OK",
            timestamp: new Date(),
            ...d,
          };
        } else if (typeof d === "object") {
          return {
            statusCode: 200,
            code: 1000,
            message: this.i18nService.t("global.errorCode.1000"),
            timestamp: new Date(),
            data: d,
          };
        } else if ((typeof d === "string" && this.isNumber(d)) || typeof d === "number") {
          const message = this.i18nService.t(`global.errorCode.${d}` as I18nPath);
          return {
            statusCode: 200,
            code: Number(d),
            message: message ? message : this.i18nService.t("global.errorCode.1000"),
            timestamp: new Date(),
          };
        } else if (typeof d === "string") {
          return {
            statusCode: 200,
            code: 1000,
            message: d,
            timestamp: new Date(),
          };
        }
      }),
    );
  }
}
