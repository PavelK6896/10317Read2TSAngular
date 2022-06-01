import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { urlConfig } from "../config/urlConfig";
import { PagePostResponseDto, PostResponseDto } from "../utill/interfaceUtill";
import { CreatePostPayload } from "../utill/classUtill";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  getPagePosts(number: number): Observable<PagePostResponseDto> {
    let params = new HttpParams();
    params = params.append('page', number);
    return this.http.get<PagePostResponseDto>(urlConfig.getAllPosts, {params: params});
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post(urlConfig.createPost, postPayload);
  }

  getPostById(id: number): Observable<PostResponseDto> {
    return this.http.get<PostResponseDto>(urlConfig.getPostById + id);
  }

  getPagePostByUsername(name: string): Observable<PagePostResponseDto> {
    return this.http.get<PagePostResponseDto>(urlConfig.getPagePostByUsername + name);
  }

  getPagePostBySubReadId(subId: number): Observable<PagePostResponseDto> {
    return this.http.get<PagePostResponseDto>(urlConfig.getPagePostBySubReadId + subId);
  }


}
