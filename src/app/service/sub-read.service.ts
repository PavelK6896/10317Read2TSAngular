import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { urlConfig } from "../config/urlConfig";
import { PageSubReadDto, SubReadDto } from "../utill/interfaceUtill";

@Injectable({
  providedIn: 'root'
})
export class SubReadService {

  constructor(private http: HttpClient) {
  }

  getPageSubRead(): Observable<PageSubReadDto> {
    return this.http.get<PageSubReadDto>(urlConfig.getPageSubRead);
  }

  getSubReadById(subId: number): Observable<SubReadDto> {
    return this.http.get<SubReadDto>(urlConfig.getSubReadById + '/' + subId);
  }

  createSubRead(subReadDto: SubReadDto): Observable<SubReadDto> {
    return this.http.post<SubReadDto>(urlConfig.createSubRead, subReadDto);
  }
}
