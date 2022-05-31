import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CommentPayload } from "../utill/classUtill";
import { urlConfig } from "../config/urlConfig";
import { SliceCommentsDto } from "../utill/interfaceUtill";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  createComment(commentPayload: CommentPayload): Observable<[]> {
    return this.httpClient.post<any>(urlConfig.createComment, commentPayload);
  }

  getSliceCommentsForPost(postId: number): Observable<SliceCommentsDto> {
    return this.httpClient.get<SliceCommentsDto>(urlConfig.getSliceCommentsForPost + postId);
  }

  getSliceCommentsByUser(name: string): Observable<SliceCommentsDto> {
    return this.httpClient.get<SliceCommentsDto>(urlConfig.getSliceCommentsByUser + name);
  }
}
