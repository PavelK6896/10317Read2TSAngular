export class SubReadModel {
  id?: number;
  name: string | null;
  description: string;
  numberOfPosts?: number;

  constructor(id: number, name: string, description: string, numberOfPosts: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.numberOfPosts = numberOfPosts;
  }
}

export class CreatePostPayload {
  postName: string | undefined;
  subReadName?: string;
  url?: string;
  description: string | undefined;
}

export class CommentPayload {
  text: string | undefined;
  postId: number | undefined;
  userName?: string;
  createdDate?: string;
}
