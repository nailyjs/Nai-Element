/*
 * Copyright (C) 2024 Zero naily.cc
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";
import { I18nPath, I18nTranslations } from "cc.naily.element.generated";
import { plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";

@Injectable()
export class CommonValidationPipe implements PipeTransform {
  constructor(private readonly i18nService: I18nService<I18nTranslations>) {}

  private getFirstError(errors: ValidationError[]): string {
    return errors[0].constraints[Object.keys(errors[0].constraints)[0]];
  }

  private getFirstConstraint(errors: ValidationError[]): string {
    return Object.keys(errors[0].constraints)[0];
  }

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value) || {};
    const errors = await validate(object);
    if (errors.length === 0) return value;
    const firstError = this.getFirstError(errors);
    const firstConstraint = this.getFirstConstraint(errors);
    if (!firstError.startsWith("global.errorCode.")) {
      throw new BadRequestException({
        code: 1017,
        message: `${this.i18nService.t("global.errorCode.1017").replace("{}", `{${firstError}}`)}`,
        constraint: firstConstraint,
      });
    } else {
      throw new BadRequestException({
        code: parseInt(firstError.replace("global.errorCode.", "")),
        message: `${this.i18nService.t(firstError as I18nPath)}`,
        constraint: firstConstraint,
      });
    }
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
