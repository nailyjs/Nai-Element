import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppleService {
  constructor(private readonly configService: ConfigService) {}
}
