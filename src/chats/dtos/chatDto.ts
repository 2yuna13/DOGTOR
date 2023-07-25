import { IsEmail, IsString, IsNumber, IsEnum } from "class-validator";

enum StatusEnum {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  COMPLETED = "completed",
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

export { ChatRequestDto, ChatListDto, ChatSelectDto, ChatStatusDto };
