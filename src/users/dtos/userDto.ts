import { IsEmail, IsString, Length, Matches, IsEnum } from "class-validator";

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

class UserDto extends VerifyCodeDto {
  @IsString()
  nickname: string;

  @IsString()
  role: string;

  constructor(email: string, nickname: string, role: string) {
    super(email);
    this.nickname = nickname;
    this.role = role;
  }
}

export {
  UserRegisterDto,
  VerifyCodeDto,
  VerifyEmailDto,
  UserLoginDto,
  VerifyVetDto,
  UserDto,
};
