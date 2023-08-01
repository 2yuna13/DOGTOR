import {
  IsString,
  IsEmail,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsOptional,
} from "class-validator";

// Data Transform Object
// 유효성 검증

enum StatusEnum {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

enum UserRoleEnum {
  USER = "user",
  VET = "vet",
  ADMIN = "admin",
}

enum UserBlockEnum {
  FALSE = "false",
  TRUE = "true",
}

enum UserDeleteEnum {
  FALSE = "false",
  TRUE = "true",
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

class UserListDto {
  @IsOptional()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;

  @IsOptional()
  @IsEnum(UserBlockEnum)
  blocked: UserBlockEnum;

  @IsOptional()
  @IsEnum(UserDeleteEnum)
  deleted: UserDeleteEnum;

  constructor(
    role: UserRoleEnum,
    blocked: UserBlockEnum,
    deleted: UserDeleteEnum
  ) {
    this.role = role;
    this.blocked = blocked;
    this.deleted = deleted;
  }
}

export { VetStatusDto, VetListDto, UserListDto };
