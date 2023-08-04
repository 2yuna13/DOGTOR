import {
  IsString,
  IsEmail,
  IsNumber,
  IsEnum,
  IsOptional,
} from "class-validator";

// Data Transform Object
// 유효성 검증

enum StatusEnum {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

enum ReportStatusEnum {
  PENDING = "pending",
  COMPLETED = "completed",
}

enum UserRoleEnum {
  USER = "user",
  VET = "vet",
  ADMIN = "admin",
}

enum UserBlockEnum {
  FALSE = "false",
  TRUE = "true",
  PERMANENT = "permanent",
}

enum UserDeleteEnum {
  FALSE = "false",
  TRUE = "true",
}

enum UserOrderByEnum {
  ASC = "asc",
  DESC = "desc",
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

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsEnum(UserOrderByEnum)
  orderBy: UserOrderByEnum;

  constructor(
    role: UserRoleEnum,
    blocked: UserBlockEnum,
    deleted: UserDeleteEnum,
    search: string,
    orderBy: UserOrderByEnum
  ) {
    this.role = role;
    this.blocked = blocked;
    this.deleted = deleted;
    this.search = search;
    this.orderBy = orderBy;
  }
}

class UserStatusDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(UserBlockEnum)
  blocked: UserBlockEnum;

  @IsOptional()
  @IsEnum(UserDeleteEnum)
  deleted: UserDeleteEnum;

  constructor(email: string, blocked: UserBlockEnum, deleted: UserDeleteEnum) {
    this.email = email;
    this.blocked = blocked;
    this.deleted = deleted;
  }
}

class ReportListDto {
  @IsEnum(ReportStatusEnum)
  status: ReportStatusEnum;

  constructor(status: ReportStatusEnum) {
    this.status = status;
  }
}

class ReportStatusDto {
  @IsNumber()
  id: number;

  @IsEnum(StatusEnum)
  status: StatusEnum;

  constructor(id: number, status: StatusEnum) {
    this.id = id;
    this.status = status;
  }
}

export {
  VetStatusDto,
  VetListDto,
  UserListDto,
  UserStatusDto,
  ReportListDto,
  ReportStatusDto,
};
