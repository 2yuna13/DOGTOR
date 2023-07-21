import { IsString, IsEmail, IsNumber, IsEnum } from "class-validator";

// Data Transform Object
// 유효성 검증

enum statusEnum {
  pending = "pending",
  accepted = "accepted",
  rejected = "rejected",
}

class VetListDto {
  @IsEnum(statusEnum)
  status: statusEnum;

  constructor(status: statusEnum) {
    this.status = status;
  }
}

class VetStatusDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsEnum(statusEnum)
  status: statusEnum;

  constructor(id: number, email: string, status: statusEnum) {
    this.id = id;
    this.email = email;
    this.status = status;
  }
}

export { VetStatusDto, VetListDto };
