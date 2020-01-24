import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const postingCode = this.route.snapshot.params['id'];

    if (postingCode) {
      this.loadPosting(postingCode);
    }

    this.ptbr = this.calendarTranslate.translate();
    this.loadCategories();
    this.loadPeople();
  }

  get editing() {
    return Boolean(this.posting.id);
  }

  new(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.posting = new Posting();
    }.bind(this), 1);

    this.router.navigate(['/postings/new']);
  }

  loadPosting(id: number) {
    this.postingService.findById(id)
    .then(posting => {
      this.posting = posting;
    }).catch(error => this.errorHandlerService.handle(error));
  }

  save(form: FormControl) {
    if (this.editing) {
      this.editPosting(form);
    } else {
      this.addPosting(form);
    }
  }

  addPosting(form: FormControl) {
    this.postingService.save(this.posting)
      .then(postingInsert => {
        this.toastyService.success('Lançamento cadastrado com sucesso.');
        //form.reset();
        //this.posting = new Posting();
        this.router.navigate(['/postings', postingInsert.id]);

      }).catch(error => this.errorHandlerService.handle(error));
  }

  editPosting(form: FormControl) {
    this.postingService.update(this.posting)
      .then(posting => {
        this.posting = posting;

        this.toastyService.success('Lançamento alterado com sucesso.');
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
