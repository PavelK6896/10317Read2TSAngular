import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommentPayload } from "../utill/classUtill";
import { urlConfig } from "../config/urlConfig";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  postComment(commentPayload: CommentPayload): Observable<[]> {
    return this.httpClient.post<any>(urlConfig.postComment, commentPayload);
  }

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(urlConfig.getAllCommentsForPost + postId);
  }

  getAllCommentsByUser(name: string): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(urlConfig.getAllCommentsByUser + name);
  }
}
