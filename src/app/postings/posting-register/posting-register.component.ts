import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CalendarTranslateService } from 'src/app/calendar-translate.service';
import { CategoryService } from 'src/app/categories/category.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PersonService } from 'src/app/people/person.service';
import { PostingService } from '../posting.service';

import { ToastyService } from 'ng2-toasty';

import {Posting} from 'src/app/models/posting';
import { Title } from '@angular/platform-browser';

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
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const postingCode = this.route.snapshot.params['id'];
    this.title.setTitle('Novo lançamento');
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

  new(form) {
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
      this.editTitlePageModeEditing();
    }).catch(error => this.errorHandlerService.handle(error));
  }

  save(form) {
    if (this.editing) {
      this.alterPosting(form);
    } else {
      this.addPosting(form);
    }
  }

  addPosting(form) {
    this.postingService.save(this.posting)
      .then(postingInsert => {
        this.toastyService.success('Lançamento cadastrado com sucesso.');
        //form.reset();
        //this.posting = new Posting();
        this.router.navigate(['/postings', postingInsert.id]);

      }).catch(error => this.errorHandlerService.handle(error));
  }

  alterPosting(form) {
    this.postingService.update(this.posting)
      .then(posting => {
        this.posting = posting;

        this.toastyService.success('Lançamento alterado com sucesso.');
        this.editTitlePageModeEditing();
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

  editTitlePageModeEditing() {
    this.title.setTitle(`Edição de lançamento: ${this.posting.description}`);
  }
}
