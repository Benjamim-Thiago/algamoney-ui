import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { observable } from 'rxjs';
import { Person } from '../models/person';

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

  save(person: Person): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return this.http.post<Person>(
      this.personUrl, person, {headers})
    .toPromise();
  }

  remove(id: number): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.personUrl}/${id}`, {headers})
      .toPromise()
      .then(() => null);
  }

  modifyStatus(id: number, status: boolean): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.put(`${this.personUrl}/${id}/status`,{status: status}, {headers})
      .toPromise()
      .then(() => null);
  }

  update(person: Person): Promise<Person> {
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    .append('Content-Type', 'application/json');

    return this.http.put<Person>(`${this.personUrl}/${person.id}`, person, {headers})
        .toPromise()
        .then(response => {
          const personUpdated = response as Person;

          return personUpdated;
        });
  }

  findById(id: number): Promise<Person> {
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.personUrl}/${id}`, {headers})
      .toPromise()
      .then(response => {
        const person = response as Person;
        return person;
      });
  }
}
