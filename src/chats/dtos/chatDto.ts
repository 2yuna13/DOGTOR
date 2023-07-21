import { IsEmail, IsString, IsNumber, IsEnum } from "class-validator";

enum statusEnum {
  pending = "pending",
  accepted = "accepted",
  rejected = "rejected",
  completed = "completed",
}

class ChatRequestDto {
  @IsEmail()
  userEmail: string;

  @IsEmail()
  vetEmail: string;

  @IsString()
  content: string;

  constructor(userEmail: string, vetEmail: string, content: string) {
    this.userEmail = userEmail;
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
  @IsNumber()
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

class ChatStatusDto {
  @IsNumber()
  id: number;

  @IsEnum(statusEnum)
  status: statusEnum;

  constructor(id: number, status: statusEnum) {
    (this.id = id), (this.status = status);
  }
}

export { ChatRequestDto, ChatListDto, ChatSelectDto, ChatStatusDto };
