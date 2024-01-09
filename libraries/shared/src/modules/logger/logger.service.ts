/*
 * Copyright (c) naily.cc 2024.
 *
 * The code contained in this file is the property of naily.cc.
 * This code is provided "AS IS" without warranty of any kind, either expressed or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
 * Unauthorized copying, distribution, or use for commercial purposes is strictly prohibited.
 */

import { ConsoleLogger, Injectable, Scope } from "@nestjs/common";
import { LoggerService } from "@nestjs/common/services/logger.service";
import { LOGGER } from "./logger.module";

@Injectable({ scope: Scope.TRANSIENT })
export class CommonLogger extends ConsoleLogger implements LoggerService {
  log<Message>(message: Message, context?: string) {
    LOGGER.info({
      message,
      context: this.context ? this.context : context,
    });
  }

  warn<Message>(message: Message, context?: string) {
    LOGGER.warn({
      message,
      context: this.context ? this.context : context,
    });
  }

  verbose<Message>(message: Message, context?: string) {
    LOGGER.verbose({
      message,
      context: this.context ? this.context : context,
    });
  }

  error<Message>(message: Message, context?: string) {
    LOGGER.error({
      message,
      context: this.context ? this.context : context,
    });
  }

  fatal<Message>(message: Message, context?: string) {
    LOGGER.error({
      message,
      context: this.context ? this.context : context,
    });
  }

  debug<Message>(message: Message, context?: string) {
    LOGGER.debug({
      message,
      context: this.context ? this.context : context,
    });
  }
}
