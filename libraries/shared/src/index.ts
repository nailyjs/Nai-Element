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

export * from "./modules/config";
export * from "./modules/cache";
export * from "./modules/i18n";
export * from "./modules/throttler";
export * from "./modules/mail";
export * from "./modules/error";
export * from "./modules/dev";
export * from "./modules/logger";
export * from "./modules/upyun";
export * from "./modules/schedule";

export * from "./module.module";
export * from "./errors";
export * from "./common";
export * from "./interceptors";

import * as Config from "./modules/config";
import * as Cache from "./modules/cache";
import * as I18n from "./modules/i18n";
import * as Throttler from "./modules/throttler";
import * as Mail from "./modules/mail";
import * as Error from "./modules/error";
import * as Dev from "./modules/dev";
import * as Logger from "./modules/logger";
import * as Upyun from "./modules/upyun";
import * as Schedule from "./modules/schedule";

import * as Common from "./common";
import * as Errors from "./errors";
import * as Interceptors from "./interceptors";
import { NailyContext } from "./module.module";

export default {
  ...Config,
  ...Cache,
  ...I18n,
  ...Throttler,
  ...Mail,
  ...Error,
  ...Dev,
  ...Logger,
  ...Upyun,
  ...Schedule,
  NailyContext,
  ...Common,
  ...Errors,
  ...Interceptors,
};
