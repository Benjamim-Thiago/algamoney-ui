import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CalendarTranslateService } from 'src/app/calendar-translate.service';
import { CategoryService } from 'src/app/categories/category.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PersonService } from 'src/app/people/person.service';
import { PostingService } from '../posting.service';

import { ToastyService } from 'ng2-toasty';

import {Posting} from 'src/app/models/posting';

@Component({
  selector: 'app-posting-register',
  templateUrl: './posting-register.component.html',
  styleUrls: ['./posting-register.component.css']
})
export class PostingRegisterComponent implements OnInit {
  private calendarTranslate = new CalendarTranslateService();
  ptbr: any;

  types = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  posting = new Posting();
  categories = [];

  people = [];

  constructor(
    private categoryService: CategoryService,
    private personService: PersonService,
    private postingService: PostingService,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.ptbr = this.calendarTranslate.translate();
    this.loadCategories();
    this.loadPeople();
  }

  save(form: FormControl) {
    this.postingService.save(this.posting)
      .then(() => {
        this.toastyService.success('Lançamento cadstrado com sucesso.');

        form.reset();
        this.posting = new Posting();

      }).catch(error => this.errorHandlerService.handle(error));
  }

  loadCategories() {
    return this.categoryService.listAll()
    .then(categories => {
      this.categories = categories.map(c => ({label: c.name, value: c.id}));
    });
  }

  loadPeople() {
    this.personService.listAll()
    .then(people => {
      this.people = people.map(p => ({label: p.name, value: p.id}));
    });
  }
}
