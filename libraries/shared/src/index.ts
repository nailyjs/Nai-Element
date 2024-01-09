export * from "./modules/config";
export * from "./modules/cache";
export * from "./modules/i18n";
export * from "./modules/throttler";
export * from "./modules/mail";
export * from "./modules/error";
export * from "./modules/dev";
export * from "./modules/logger";

export * from "./interfaces";
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

import * as Interfaces from "./interfaces";
import * as Common from "./common";
import * as Errors from "./errors";
import * as Interceptors from "./interceptors";

export default {
  ...Config,
  ...Cache,
  ...I18n,
  ...Throttler,
  ...Mail,
  ...Error,
  ...Dev,
  ...Logger,
  ...Interfaces,
  ...Common,
  ...Errors,
  ...Interceptors,
};
