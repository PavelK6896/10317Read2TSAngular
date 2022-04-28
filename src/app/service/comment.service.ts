import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommentPayload } from "../utill/class1";
import { url1 } from "../utill/url1";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  postComment(commentPayload: CommentPayload): Observable<[]> {
    return this.httpClient.post<any>(url1.postComment, commentPayload);
  }

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(url1.getAllCommentsForPost + postId);
  }

  getAllCommentsByUser(name: string): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(url1.getAllCommentsByUser + name);
  }
}
