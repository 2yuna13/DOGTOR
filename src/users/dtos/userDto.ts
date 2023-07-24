import { IsEmail, IsString, Length, Matches } from "class-validator";

// Data Transform Object
// 유효성 검증
class VerifyCodeDto {
  @IsEmail()
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

class UserDto extends VerifyCodeDto {
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
  @IsEmail()
  userEmail: string;

  @IsString()
  name: string;

  @IsString()
  hospitalName: string;

  @IsString()
  description: string;

  @IsString()
  imgPath: string;

  constructor(
    userEmail: string,
    name: string,
    hospitalName: string,
    description: string,
    imgPath: string
  ) {
    this.userEmail = userEmail;
    this.name = name;
    this.hospitalName = hospitalName;
    this.description = description;
    this.imgPath = imgPath;
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

export { UserDto, VerifyCodeDto, VerifyEmailDto, UserLoginDto, VerifyVetDto };
