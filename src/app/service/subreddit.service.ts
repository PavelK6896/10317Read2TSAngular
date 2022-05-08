import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { urlConfig } from "../utill/urlConfig";
import { SubredditModel } from "../utill/class1";

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  constructor(private http: HttpClient) {
  }

  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this.http.get<Array<SubredditModel>>(urlConfig.getAllSubreddits);
  }

  getSubredditsId(subId: number): Observable<SubredditModel> {
    return this.http.get<SubredditModel>(urlConfig.getSubredditsId + '/' + subId);
  }

  createSubreddit(subredditModel: SubredditModel): Observable<SubredditModel> {
    return this.http.post<SubredditModel>(urlConfig.createSubreddit, subredditModel);
  }
}
