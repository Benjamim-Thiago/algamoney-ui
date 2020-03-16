import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import * as moment from 'moment';
import { Posting } from '../models/posting';
import { environment } from 'src/environments/environment';

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
  postingUrl: string;
  constructor(private http: HttpClient) {
    this.postingUrl = `${environment.apiUrl}/postings`;
  }

  search(filter: PostingFilter): Promise<any> {
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

    return this.http.get(`${this.postingUrl}?summary`, { params })
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
   return this.http.post<Posting>(
      this.postingUrl, posting)
    .toPromise();
  }

  remove(id: number): Promise<void> {
   return this.http.delete(`${this.postingUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  update(posting: Posting): Promise<Posting> {
    // const headers = new HttpHeaders()
    // .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    // .append('Content-Type', 'application/json');

    return this.http.put<Posting>(`${this.postingUrl}/${posting.id}`, posting)
        .toPromise()
        .then(response => {
          const postingUpdated = response as Posting;

          this.convertStringsForDates([postingUpdated]);

          return postingUpdated;
        });
  }

  findById(id: number): Promise<Posting> {
    // const headers = new HttpHeaders()
    // .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.postingUrl}/${id}`)
      .toPromise()
      .then(response => {
        const posting = response as Posting;

        this.convertStringsForDates([posting]);

        return posting;
      });
  }

  urlUploadAnexo(): string {
    return `${this.postingUrl}/anexo`;
  }


  private convertStringsForDates(postings: Posting[]) {
    for (const posting of postings) {
      posting.expirationDate = moment(posting.expirationDate,
        'YYYY-MM-DD').toDate();

      if (posting.paymentDate) {
        posting.paymentDate = moment(posting.paymentDate,
          'YYYY-MM-DD').toDate();
      }
    }
  }
}
