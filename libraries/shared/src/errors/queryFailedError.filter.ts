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

import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { QueryFailedError } from "typeorm";
import { CommonLogger } from "../modules/logger";
import { Response } from "express";
import { I18nService } from "nestjs-i18n";
import { I18nTranslations } from "cc.naily.element.generated";

@Catch(QueryFailedError)
export class TypeOrmQueryFailedErrorFilter implements ExceptionFilter {
  constructor(
    private readonly commonLogger: CommonLogger,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {
    commonLogger.setContext(TypeOrmQueryFailedErrorFilter.name);
  }

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    console.error(exception);
    this.commonLogger.error("SQL执行错误!!");
    this.commonLogger.error(exception.message);

    response
      .status(500)
      .json({
        statusCode: 500,
        code: 1059,
        message: this.i18nService.t("global.errorCode.1059"),
      })
      .end();
  }
}
