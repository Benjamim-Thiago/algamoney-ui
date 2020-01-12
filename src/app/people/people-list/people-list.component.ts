import { Component, OnInit, ViewChild } from '@angular/core';

import { PersonService, PersonFilter } from '../person.service';
import {ConfirmationService} from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api/public_api';

import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Table } from 'primeng/table/table';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  @ViewChild('table', {static: true}) grid: Table;

  filter = new PersonFilter();
  people = [];
  totalRegister = 0;

  constructor(
    private personService: PersonService,
    private errorHandlerService: ErrorHandlerService,
    private toastyService: ToastyService,
    private confirmationService: ConfirmationService) { }


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

  confirmRemove(person: any) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja
        excluir o lancamento <strong>${person.name}</strong>?`,
      accept: () => {
        this.remove(person);
      }
    });
  }

  remove(person: any) {
    this.personService.remove(person.id)
      .then(() => {
        this.grid.reset();
        this.toastyService.success('Pessoa excluída com sucesso!');
      }).catch(error => this.errorHandlerService.handle(error));
  }

}
