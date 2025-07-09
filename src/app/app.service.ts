import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getLocation(search): Observable<any> {
    return this.http.get('http://naalu-api.test/api/locations?search=' + search);
  }
}
