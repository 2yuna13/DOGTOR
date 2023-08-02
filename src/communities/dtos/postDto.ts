import { IsString, Length, IsEnum, IsInt, IsIn } from "class-validator";

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

enum ReportReason {
  Abuse = "욕설",
  InappropriateContent = "부적절한 내용",
  Spam = "스팸",
  Other = "기타",
}

class ReportPostDto {
  @IsInt()
  post_id: number;

  @IsInt()
  report_id: number;

  @IsString()
  @IsIn(Object.values(ReportReason))
  reason: string;

  constructor(post_id: number, report_id: number, reason: string) {
    this.post_id = post_id;
    this.report_id = report_id;
    this.reason = reason;
  }
}

export { CreatePostDto, UpdatePostDto, ReportPostDto, Category };
