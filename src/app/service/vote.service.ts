import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { url1 } from "../utill/url1";
import { VoteDto } from "../utill/interface1";

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) {
  }

  vote(voteDto: VoteDto): Observable<any> {
    return this.http.post(url1.vote, voteDto);
  }

}
