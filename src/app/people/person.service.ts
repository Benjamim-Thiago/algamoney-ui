import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export class PersonFilter {
  name: string;

  page = 0;
  itemsPerPage = 3;
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  personUrl = 'http://localhost:8080/people';

  constructor(private http: HttpClient) { }

  listAll(): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.personUrl, { headers })
      .toPromise()
      .then(response => {
        return response['content'];
      });
  }

  search(filter: PersonFilter): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    let params = new HttpParams();

    params = params.set('page', filter.page.toString());
    params = params.set('size', filter.itemsPerPage.toString());

    if (filter.name) {
      params = params.set('name', filter.name);
    }


    return this.http.get(this.personUrl, { headers, params })
      .toPromise()
      .then(response => {
        const people = response['content']
        const result = {
          people,
          total: response['totalElements']
        }
        return result;
      });
  }

  remove(id: number): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.personUrl}/${id}`, {headers})
      .toPromise()
      .then(() => null);
  }
}
