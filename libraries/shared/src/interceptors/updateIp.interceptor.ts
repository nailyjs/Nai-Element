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

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { User, UserRepository } from "cc.naily.element.database";
import { Request } from "express";

@Injectable()
export class UpdateIpInterceptor implements NestInterceptor {
  constructor(private readonly userRepository: UserRepository) {}

  public async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as User;
    // const ip = request.ip;
    if (!user) return next.handle();
    // await this.userRepository.updateIp(ip, user.userID);
    return next.handle();
  }
}
