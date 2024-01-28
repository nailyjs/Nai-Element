import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("浏览")
@Controller("broswer/browserTrack")
export class BrowserTrackController {
  constructor() {}
}
