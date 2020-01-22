import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';
import { Posting } from '../models/posting';

export class PostingFilter {
  description: string;
  firstDate: Date;
  lastDate: Date;

  page = 0;
  itemsPerPage = 3;
}

@Injectable({
  providedIn: 'root'
})
export class PostingService {
  postingUrl = 'http://localhost:8080/postings';
  constructor(private http: HttpClient) { }

  search(filter: PostingFilter): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    let params = new HttpParams();

    params = params.set('page', filter.page.toString());
    params = params.set('size', filter.itemsPerPage.toString());

    if (filter.description) {
      params = params.set('description', filter.description);
    }

    if (filter.firstDate) {
      params = params.set('firstDate', moment(filter.firstDate).format('YYYY-MM-DD'));
    }

    if (filter.lastDate) {
      params = params.set('lastDate', moment(filter.lastDate).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.postingUrl}?summary`, { headers, params })
      .toPromise()
      .then(response => {
        const postings = response['content']
        const result = {
          postings,
          total: response['totalElements']
        }

        return result;
    });
  }

  save(posting: Posting): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return this.http.post<Posting>(
      this.postingUrl, posting, {headers})
  .toPromise();
  }

  remove(id: number): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.postingUrl}/${id}`, {headers})
      .toPromise()
      .then(() => null);
  }
}
