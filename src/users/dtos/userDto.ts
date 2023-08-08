import {
  IsEmail,
  IsString,
  Length,
  Matches,
  IsEnum,
  IsOptional,
} from "class-validator";

// Data Transform Object
// 유효성 검증

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

class VerifyCodeDto {
  @IsEmail()
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

class UserRegisterDto extends VerifyCodeDto {
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/)
  @Length(10)
  password: string;

  @IsString()
  nickname: string;

  constructor(email: string, password: string, nickname: string) {
    super(email);
    this.password = password;
    this.nickname = nickname;
  }
}

class VerifyEmailDto extends VerifyCodeDto {
  @IsString()
  code: string;

  constructor(email: string, code: string) {
    super(email);
    this.code = code;
  }
}

class VerifyVetDto {
  @IsString()
  name: string;

  @IsString()
  hospitalName: string;

  @IsString()
  description: string;

  @IsEnum(RegionEnum)
  region: RegionEnum;

  constructor(
    name: string,
    hospitalName: string,
    description: string,
    region: RegionEnum
  ) {
    this.name = name;
    this.hospitalName = hospitalName;
    this.description = description;
    this.region = region;
  }
}

class UserLoginDto extends VerifyCodeDto {
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/)
  @Length(10)
  password: string;

  constructor(email: string, password: string) {
    super(email);
    this.password = password;
  }
}

class UserDto {
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/)
  @Length(10)
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  nickname: string;

  @IsOptional()
  @IsString()
  img_path?: string | null;

  constructor(password: string, nickname: string, img_path: string) {
    this.password = password;
    this.nickname = nickname;
    this.img_path = img_path;
  }
}

class VetDto {
  @IsString()
  @IsOptional()
  hospitalName: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(RegionEnum)
  @IsOptional()
  region: RegionEnum;

  constructor(hospitalName: string, description: string, region: RegionEnum) {
    this.hospitalName = hospitalName;
    this.description = description;
    this.region = region;
  }
}

export {
  UserRegisterDto,
  VerifyCodeDto,
  VerifyEmailDto,
  UserLoginDto,
  VerifyVetDto,
  UserDto,
  VetDto,
};
