import { IsEmail, IsString, Length, Matches } from "class-validator";

// Data Transform Object
// 유효성 검증
class UserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/)
  @Length(10)
  password: string;

  @IsString()
  nickname: string;

  constructor(email: string, password: string, nickname: string) {
    this.email = email;
    this.password = password;
    this.nickname = nickname;
  }
}

class VerifyCodeDto {
  @IsEmail()
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

class VerifyEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;

  constructor(email: string, code: string) {
    this.email = email;
    this.code = code;
  }
}

class VerifyVetDto {
  @IsEmail()
  userEmail: string;

  @IsString()
  name: string;

  @IsString()
  region: string;

  @IsString()
  hospitalName: string;

  @IsString()
  imgPath: string;

  constructor(
    userEmail: string,
    name: string,
    region: string,
    hospitalName: string,
    imgPath: string
  ) {
    this.userEmail = userEmail;
    this.name = name;
    this.region = region;
    this.hospitalName = hospitalName;
    this.imgPath = imgPath;
  }
}

export { UserDto, VerifyCodeDto, VerifyEmailDto, VerifyVetDto };
