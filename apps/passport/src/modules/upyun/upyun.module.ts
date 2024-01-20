import { Module } from "@nestjs/common";
import { BusinessModule } from "cc.naily.element.shared";
import { UpyunController } from "./controllers/upyun.controller";
import { UpyunUploadService } from "./providers/upload.service";

@Module({
  controllers: [UpyunController],
  providers: [UpyunUploadService],
})
export class UpyunFileModule extends BusinessModule {}
