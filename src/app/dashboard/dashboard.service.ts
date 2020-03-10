import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as moment from 'moment';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  postingUrl: string;
  constructor(private http: HttpClient) {
    this.postingUrl = `${environment.apiUrl}/postings`;
  }

  postingsPerCategory(): Promise<Array<any>> {
    console.log(`${this.postingUrl}/statistics/per-category`);
    return this.http.get(`${this.postingUrl}/statistics/per-category`)
      .toPromise()
      .then(response => response as Array<any>);
  }

  postingsPerDay(): Promise<Array<any>> {
    return this.http.get(`${this.postingUrl}/statistics/per-day`)
    .toPromise()
    .then(response => {
      const data = response as Array<any>;
      this.convertStringsForDates(data);

      return data;
    });
  }

  private convertStringsForDates(data: Array<any>) {
    for (const item of data) {
      item.dia = moment(item.dia, 'YYYY-MM-DD').toDate();
    }
  }
}
