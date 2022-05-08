import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { urlConfig } from "../utill/urlConfig";
import { VoteDto } from "../utill/interface1";

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) {
  }

  vote(voteDto: VoteDto): Observable<any> {
    return this.http.post(urlConfig.vote, voteDto);
  }

}
