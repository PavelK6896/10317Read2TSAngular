import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { urlConfig } from "../utill/urlConfig";
import { PostResponseDto } from "../utill/interface1";
import { CreatePostPayload } from "../utill/class1";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  getAllPosts(): Observable<PostResponseDto[]> {
    return this.http.get<PostResponseDto[]>(urlConfig.getAllPosts);
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {

    return this.http.post(urlConfig.createPost, postPayload);
  }

  getPostById(id: number): Observable<PostResponseDto> {
    return this.http.get<PostResponseDto>(urlConfig.getPostById + id);
  }

  getAllPostsByUser(name: string): Observable<PostResponseDto[]> {
    return this.http.get<PostResponseDto[]>(urlConfig.getAllPostsByUser + name);
  }

  getAllPostsBySub(subId: number): Observable<PostResponseDto[]> {
    return this.http.get<PostResponseDto[]>(urlConfig.getAllPostsBySub + subId);
  }


}
