import { IsString, Length, IsEnum } from "class-validator";

class CreatePostDto {
  @IsString()
  @Length(1, 255)
  title: string;

  @IsString()
  @Length(1, 1000)
  body: string;

  @IsEnum(["free", "info"])
  category: string;

  constructor(title: string, body: string, category: string) {
    this.title = title;
    this.body = body;
    this.category = category;
  }
}

class UpdatePostDto {
  @IsString()
  @Length(1, 255)
  title: string;

  @IsString()
  @Length(1, 1000)
  body: string;

  constructor(title: string, body: string) {
    this.title = title;
    this.body = body;
  }
}

export { CreatePostDto, UpdatePostDto };
