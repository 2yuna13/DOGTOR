import {
  IsEmail,
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
} from "class-validator";

enum StatusEnum {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  COMPLETED = "completed",
}

enum RegionEnum {
  SEOUL = "Seoul",
  GYEONGGI = "Gyeonggi",
  INCHEON = "Incheon",
  DAEJEON = "Daejeon",
  DAEGU = "Daegu",
  GWANGJU = "Gwangju",
  ULSAN = "Ulsan",
  BUSAN = "Busan",
  GANGWON = "Gangwon",
  CHUNGCHEONG = "Chungcheong",
  JEOLLA = "Jeolla",
  GYEONGSANG = "Gyeongsang",
  JEJU = "Jeju",
}

class ChatRequestDto {
  @IsEmail()
  vetEmail: string;

  @IsString()
  message: string;

  constructor(vetEmail: string, message: string) {
    this.vetEmail = vetEmail;
    this.message = message;
  }
}

class ChatListDto {
  @IsEmail()
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

class ChatSelectDto {
  @IsString()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

class ChatStatusDto {
  @IsNumber()
  id: number;

  @IsEnum(StatusEnum)
  status: StatusEnum;

  constructor(id: number, status: StatusEnum) {
    (this.id = id), (this.status = status);
  }
}

class VetRegionDto {
  @IsString()
  currentPage: string;

  @IsOptional()
  @IsEnum(RegionEnum)
  region: RegionEnum;

  @IsOptional()
  @IsString()
  search: string;

  constructor(currentPage: string, region: RegionEnum, search: string) {
    this.currentPage = currentPage;
    this.region = region;
    this.search = search;
  }
}

export {
  ChatRequestDto,
  ChatListDto,
  ChatSelectDto,
  ChatStatusDto,
  VetRegionDto,
};
