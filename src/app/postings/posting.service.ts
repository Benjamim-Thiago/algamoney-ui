import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export interface PostingFilter {
  description: string;
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

    if (filter.description) {
      params = params.set('description', filter.description);
    }

    return this.http.get(`${this.postingUrl}?summary`, { headers, params })
      .toPromise()
      .then(response => response['content']);
  }
}
