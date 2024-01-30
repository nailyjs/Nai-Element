import { Injectable } from "@nestjs/common";

interface IsUpdatedBookMark {
  userID: number;
}

@Injectable()
export class BrowserMarkService {
  public isUpdating: IsUpdatedBookMark[] = [];

  public canFind(userID: number): boolean {
    const isUpdated = this.isUpdating.find((item) => item.userID === userID);
    if (isUpdated) return false;
    return true;
  }

  public addUpdating(userID: number): void {
    this.isUpdating.push({ userID });
  }

  public removeUpdating(userID: number): void {
    const index = this.isUpdating.findIndex((item) => item.userID === userID);
    this.isUpdating.splice(index, 1);
  }
}
