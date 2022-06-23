import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { PropertyDto } from "../utill/interfaceUtill";
import { urlConfig } from "../config/urlConfig";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private httpClient: HttpClient) {
  }

  getProperty(): Observable<PropertyDto> {
    let item = sessionStorage.getItem('property');
    if (item == null) {
      return this.getPropertyServer()
        .pipe(map(data => {
          sessionStorage.setItem('property', JSON.stringify(data))
          return data
        }))
    } else {
      return of(JSON.parse(item));
    }
  }

  getPropertyServer(): Observable<PropertyDto> {
    return this.httpClient.get<PropertyDto>(urlConfig.property);
  }

}
