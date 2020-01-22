import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryUrl = 'http://localhost:8080/categories';

  constructor(private http: HttpClient) { }

  listAll(): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.categoryUrl, { headers })
      .toPromise()
      .then(response => {
        return response;
      });
  }
}
