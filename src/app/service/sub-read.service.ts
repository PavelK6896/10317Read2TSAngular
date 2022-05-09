import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { urlConfig } from "../config/urlConfig";
import { SubReadModel } from "../utill/classUtill";

@Injectable({
  providedIn: 'root'
})
export class SubReadService {

  constructor(private http: HttpClient) {
  }

  getAllSubreddits(): Observable<Array<SubReadModel>> {
    return this.http.get<Array<SubReadModel>>(urlConfig.getAllSubreddits);
  }

  getSubredditsId(subId: number): Observable<SubReadModel> {
    return this.http.get<SubReadModel>(urlConfig.getSubredditsId + '/' + subId);
  }

  createSubreddit(subredditModel: SubReadModel): Observable<SubReadModel> {
    return this.http.post<SubReadModel>(urlConfig.createSubreddit, subredditModel);
  }
}
