import { IsNotEmpty, IsString } from "class-validator";

export class GetUserDataBodyDTO {
  @IsString()
  @IsNotEmpty()
  public namespace: string;

  @IsString()
  @IsNotEmpty()
  public key: string;
}

export class SetUserDataBodyDTO {
  @IsString()
  @IsNotEmpty()
  public namespace: string;

  @IsString()
  @IsNotEmpty()
  public key: string;

  @IsString()
  public value: string;
}
