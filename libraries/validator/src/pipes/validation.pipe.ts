import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";
import { I18nTranslations } from "cc.naily.element.generated";
import { plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";

@Injectable()
export class CommonValidationPipe implements PipeTransform {
  constructor(private readonly i18nService: I18nService<I18nTranslations>) {}

  getFirstError(errors: ValidationError[]): string {
    return errors[0].constraints[Object.keys(errors[0].constraints)[0]];
  }

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException({
        code: 1017,
        message: `${this.i18nService.t("global.errorCode.1017").replace("{}", `{${this.getFirstError(errors)}}`)}`,
      });
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
