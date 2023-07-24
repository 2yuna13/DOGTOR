import { IsString, IsEmail, IsNumber, IsEnum } from "class-validator";

// Data Transform Object
// 유효성 검증

enum StatusEnum {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

class VetListDto {
  @IsEnum(StatusEnum)
  status: StatusEnum;

  constructor(status: StatusEnum) {
    this.status = status;
  }
}

class VetStatusDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsEnum(StatusEnum)
  status: StatusEnum;

  constructor(id: number, email: string, status: StatusEnum) {
    this.id = id;
    this.email = email;
    this.status = status;
  }
}

export { VetStatusDto, VetListDto };
