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

import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { MailerService } from "@nestjs-modules/mailer";
import { I18nService } from "nestjs-i18n";
import { I18nTranslations } from "cc.naily.element.generated";
import { SenderService } from "./sender.interface";

@Injectable()
export class EmailService implements SenderService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly mailerService: MailerService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  public async sendCode(email: string): Promise<boolean> {
    try {
      const verifyCode: number = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
      await this.cacheManager.store.set(`email.verifyCode.${email}`, verifyCode, 1000 * 60 * 10);
      await this.mailerService.sendMail({
        to: email,
        subject: this.i18n.t("passport.email.template.verify"),
        html: `<div style="margin: 14px">
            <h1>${this.i18n.t("passport.email.template.verify")}</h1>
            <div>${this.i18n.t("passport.email.template.your-code-is")} ${verifyCode}</div>
            <h4>${this.i18n.t("passport.email.template.tip1")}</h4>
            <h4>${this.i18n.t("passport.email.template.tip2")}</h4><br>
            <a href="${this.i18n.t("passport.email.template.link.href")}">${this.i18n.t("passport.email.template.link.text")}</a>
          </div>`,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  public async checkCode(email: string, verifyCode: number): Promise<true> {
    const hasVerifyCode: number = await this.cacheManager.store.get(`email.verifyCode.${email}`);
    if (!hasVerifyCode) throw new ForbiddenException(1010);
    if (hasVerifyCode !== verifyCode) throw new ForbiddenException(1011);
    return true;
  }

  public async deleteCode(email: string): Promise<true> {
    await this.cacheManager.store.del(`email.verifyCode.${email}`);
    return true;
  }
}
