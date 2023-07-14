import { IsString } from "class-validator";

// Data Transform Object
// 유효성 검증
export class UserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  userName: string;

  constructor(email: string, password: string, userName: string) {
    this.email = email;
    this.password = password;
    this.userName = userName;
  }
}
