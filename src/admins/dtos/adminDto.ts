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

enum UserTypeEnum {
  NORMAL = "normal",
  KAKAO = "kakao",
  GOOGLE = "google",
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
  @IsEnum(UserTypeEnum)
  type: UserTypeEnum;

  @IsOptional()
  @IsBoolean()
  blocked: boolean;

  constructor(role: UserRoleEnum, type: UserTypeEnum, blocked: boolean) {
    this.role = role;
    this.type = type;
    this.blocked = blocked;
  }
}

export { VetStatusDto, VetListDto, UserListDto };
