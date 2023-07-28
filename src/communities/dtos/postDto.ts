import { IsString, Length, IsEnum } from "class-validator";

enum Category {
  FREE = "free",
  INFO = "info",
}

class CreatePostDto {
  @IsString()
  @Length(1, 255)
  title: string;

  @IsString()
  @Length(1, 1000)
  body: string;

  @IsEnum(Category)
  category: Category;

  constructor(title: string, body: string, category: Category) {
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
