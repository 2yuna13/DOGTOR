import { IsEmail, IsString, IsNumber, IsEnum } from "class-validator";

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
  content: string;

  constructor(vetEmail: string, content: string) {
    this.vetEmail = vetEmail;
    this.content = content;
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

  @IsEnum(RegionEnum)
  region: RegionEnum;

  constructor(currentPage: string, region: RegionEnum) {
    this.currentPage = currentPage;
    this.region = region;
  }
}

export {
  ChatRequestDto,
  ChatListDto,
  ChatSelectDto,
  ChatStatusDto,
  VetRegionDto,
};
