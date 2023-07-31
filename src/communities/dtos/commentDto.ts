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
  Abuse = "욕설",
  InappropriateContent = "부적절한 내용",
  Spam = "스팸",
  Other = "기타",
}

enum ReportStatus {
  Pending = "pending",
  Resolved = "resolved",
  Rejected = "rejected",
}

class ReportCommentDto {
  @IsInt()
  comment_id: number;

  @IsInt()
  report_id: number;

  @IsString()
  @IsIn(Object.values(ReportReason))
  reason: string;

  @IsString()
  @IsIn(Object.values(ReportStatus))
  status: string;

  constructor(comment_id: number, report_id: number, reason: string) {
    this.comment_id = comment_id;
    this.report_id = report_id;
    this.reason = reason;
    this.status = ReportStatus.Pending;
  }
}

export { CreateCommentDto, ReportCommentDto };
