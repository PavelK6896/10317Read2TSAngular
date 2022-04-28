import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { url1 } from "../utill/url1";
import { SubredditModel } from "../utill/class1";

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  constructor(private http: HttpClient) {
  }

  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this.http.get<Array<SubredditModel>>(url1.getAllSubreddits);
  }

  getSubredditsId(subId: number): Observable<SubredditModel> {
    return this.http.get<SubredditModel>(url1.getSubredditsId + '/' + subId);
  }

  createSubreddit(subredditModel: SubredditModel): Observable<SubredditModel> {
    return this.http.post<SubredditModel>(url1.createSubreddit, subredditModel);
  }
}
