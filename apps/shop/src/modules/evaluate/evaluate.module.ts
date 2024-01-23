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

import { Module } from "@nestjs/common";
import { BusinessModule } from "cc.naily.element.shared";
import { EvaluateController } from "./controllers/evaluate.controller";
import {
  ShopEvaluateLikeRepository,
  ShopEvaluateRepository,
  ShopProductRepository,
  UserControlRepository,
  UserRepository,
} from "cc.naily.element.database";
import { EvaluateService } from "./providers/evaluate.service";
import { EvaluateLikeController } from "./controllers/like.controller";
import { EvaluateLikeService } from "./providers/like.service";

@Module({
  controllers: [EvaluateController, EvaluateLikeController],
  providers: [
    EvaluateService,
    EvaluateLikeService,
    ShopEvaluateRepository,
    ShopEvaluateLikeRepository,
    UserRepository,
    UserControlRepository,
    ShopProductRepository,
  ],
})
export class EvaluateModule extends BusinessModule {}
