import { Module } from "@nestjs/common";
import { BusinessModule } from "cc.naily.element.shared";
import { FileController } from "./controllers/file.controller";
import { UpyunUploadService } from "./providers/upload.service";

@Module({
  controllers: [FileController],
  providers: [UpyunUploadService],
})
export class FileModule extends BusinessModule {}
