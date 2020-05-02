import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Person } from '../models/person';
import { State } from '../models/state';
import { City } from '../models/city';

export class PersonFilter {
  name: string;

  page = 0;
  itemsPerPage = 3;
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  personUrl: string;
  cityUrl: string;
  stateUrl: string;

  constructor(private http: HttpClient) {
    this.personUrl = `${environment.apiUrl}/people`;
    this.stateUrl = `${environment.apiUrl}/states`;
    this.cityUrl = `${environment.apiUrl}/cities`;
  }

  listAll(): Promise<any> {
    // const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.personUrl)
      .toPromise()
      .then(response => {
        return response['content'];
      });
  }

  search(filter: PersonFilter): Promise<any> {
    // const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    let params = new HttpParams();

    params = params.set('page', filter.page.toString());
    params = params.set('size', filter.itemsPerPage.toString());

    if (filter.name) {
      params = params.set('name', filter.name);
    }

    return this.http.get(this.personUrl, { params })
      .toPromise()
      .then(response => {
        const people = response['content'];
        const result = {
          people,
          total: response['totalElements']
        };
        return result;
      });
  }

  save(person: Person): Promise<any> {
    //  const headers = new HttpHeaders()
    //  .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    //  .append('Content-Type', 'application/json');

    return this.http.post<Person>(
      this.personUrl, person)
    .toPromise();
  }

  remove(id: number): Promise<void> {
    // const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.personUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  modifyStatus(id: number, status: boolean): Promise<void> {
   // const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.put(`${this.personUrl}/${id}/status`,{status: status})
      .toPromise()
      .then(() => null);
  }

  update(person: Person): Promise<Person> {
    // const headers = new HttpHeaders()
    // .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    // .append('Content-Type', 'application/json');

    return this.http.put<Person>(`${this.personUrl}/${person.id}`, person)
        .toPromise()
        .then(response => {
          const personUpdated = response as Person;

          return personUpdated;
        });
  }

  findById(id: number): Promise<Person> {
    // const headers = new HttpHeaders()
    // .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.personUrl}/${id}`)
      .toPromise()
      .then(response => {
        const person = response as Person;
        return person;
      });
  }

  listStates(): Promise<State[]> {
    return this.http.get(this.stateUrl)
      .toPromise()
      .then(response => response as State[]);
  }

  findCitiesByStateId(state): Promise<City[]> {
    let params = new HttpParams();
    params = params.set('state', state);

    return this.http.get(this.cityUrl, { params })
      .toPromise()
      .then(response => response as City[]);
  }

}
