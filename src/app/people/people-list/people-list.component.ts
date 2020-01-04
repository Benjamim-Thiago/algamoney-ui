import { Component, OnInit } from '@angular/core';
import { PersonService, PersonFilter } from '../person.service';
import { LazyLoadEvent } from 'primeng/api/public_api';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  filter = new PersonFilter();
  people = [];
  totalRegister = 0;

  constructor(private personService: PersonService) { }


  ngOnInit() {

  }

  listAll() {
    this.personService.listAll()
    .then(result => {
      this.people = result;
    });
  }

  search(page = 0) {
    this.filter.page = page;
    this.personService.search(this.filter)
    .then(result => {
      this.totalRegister = result.total;
      this.people = result.people;
    });
  }

  changingPage(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.search(page);
  }

}
