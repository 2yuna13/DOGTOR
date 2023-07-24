import { IsEmail, IsString, IsNumber, IsEnum } from "class-validator";

enum StatusEnum {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  COMPLETED = "completed",
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

  @IsEnum(StatusEnum)
  status: StatusEnum;

  constructor(id: number, status: StatusEnum) {
    (this.id = id), (this.status = status);
  }
}

export { ChatRequestDto, ChatListDto, ChatSelectDto, ChatStatusDto };
