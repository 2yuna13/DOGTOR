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

export { UserDto, VerifyCodeDto, VerifyEmailDto };
