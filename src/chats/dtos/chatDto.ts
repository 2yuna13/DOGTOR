import {
  IsEmail,
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  Min,
  Max,
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

class ChatSelectDto {
  @IsString()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

class ChatListDto {
  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusEnum;

  constructor(status: StatusEnum) {
    this.status = status;
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

class ChatRatingDto {
  @IsNumber()
  id: number;

  @IsNumber()
  @Min(0, { message: "별점은 0점 이상이어야 합니다." })
  @Max(5, { message: "별점은 5점 이하여야 합니다." })
  grade: number;

  constructor(id: number, grade: number) {
    (this.id = id), (this.grade = grade);
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
  ChatRatingDto,
  VetRegionDto,
};
