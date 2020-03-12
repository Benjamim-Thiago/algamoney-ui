import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  postingUrl: string;

  constructor(private http: HttpClient) {
    this.postingUrl = `${environment.apiUrl}/postings`;
  }

  reportPostingPerPerson(firstDate: Date, lastDate: Date) {
    let params = new HttpParams();

    params = params.set('first', moment(firstDate).format('YYYY-MM-DD'));
    params = params.set('last', moment(lastDate).format('YYYY-MM-DD'));

    return this.http.get(`${this.postingUrl}/reports/per-person`,
    { params, responseType: 'blob' })
      .toPromise()
      .then(response => response);
  }
}
