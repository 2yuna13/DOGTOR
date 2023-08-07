import { IsString, Length, IsInt, IsIn } from "class-validator";

class CreateCommentDto {
  @IsInt()
  post_id: number;

  @IsString()
  @Length(1, 1000)
  body: string;

  constructor(post_id: number, body: string) {
    this.post_id = post_id;
    this.body = body;
  }
}

enum ReportReason {
  PROMOTION_OR_COMMERCIAL_CONTENT = "홍보/상업성",
  SPAM = "스팸",
  PROFANITY_OR_HARASSMENT = "욕설/인신공격",
  ADULT_CONTENT_OR_EXPLICITMATERIAL = "음란/선정성",
  ILLEGAL_INFORMATION = "불법정보",
  PERSONAL_INFORMATION_EXPOSURE = "개인정보 노출",
}

class ReportCommentDto {
  @IsInt()
  comment_id: number;

  @IsString()
  @IsIn(Object.values(ReportReason))
  reason: string;

  constructor(comment_id: number, reason: string) {
    this.comment_id = comment_id;
    this.reason = reason;
  }
}

export { CreateCommentDto, ReportCommentDto };
