import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryUrl: string;

  constructor(private http: HttpClient) {
    this.categoryUrl = `${environment.apiUrl}/categories`;
  }

  listAll(): Promise<any> {
    // const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.categoryUrl)
      .toPromise()
      .then(response => {
        return response;
      });
  }
}
