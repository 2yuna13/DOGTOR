import { IsInt } from "class-validator";

class CreateLikeDto {
  @IsInt()
  postId: number;

  constructor(postId: number) {
    this.postId = postId;
  }
}

export { CreateLikeDto };
