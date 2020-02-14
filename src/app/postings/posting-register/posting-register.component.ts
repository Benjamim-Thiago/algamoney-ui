import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  form: FormGroup;
  // posting = new Posting();
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
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configureForm();
    const postingCode = this.route.snapshot.params['id'];
    this.title.setTitle('Novo lançamento');
    if (postingCode) {
      this.loadPosting(postingCode);
    }

    this.ptbr = this.calendarTranslate.translate();
    this.loadCategories();
    this.loadPeople();
  }

  configureForm() {
    this.form = this.formBuilder.group({
      id: [],
      type: [ 'RECEITA', Validators.required ],
      expirationDate: [ null, Validators.required ],
      paymentDate: [],
      description: [null, [ Validators.required, Validators.minLength(5) ]],
      value: [ null, Validators.required ],
      person: this.formBuilder.group({
        id: [ null, Validators.required ],
        name: []
      }),
      category: this.formBuilder.group({
        id: [ null, Validators.required ],
        name: []
      }),
      comments: []
    });
  }

  get editing() {
    return Boolean(this.form.get('id').value);
  }

  new() {
    this.form.reset();
    setTimeout(function() {
      this.posting = new Posting();
    }.bind(this), 1);

    this.router.navigate(['/postings/new']);
  }

  loadPosting(id: number) {
    this.postingService.findById(id)
    .then(posting => {
      this.form.patchValue(posting);
      this.editTitlePageModeEditing();
    }).catch(error => this.errorHandlerService.handle(error));
  }

  save() {
    if (this.editing) {
      this.alterPosting();
    } else {
      this.addPosting();
    }
  }

  addPosting() {
    this.postingService.save(this.form.value)
      .then(postingInsert => {
        this.toastyService.success('Lançamento cadastrado com sucesso.');
        this.router.navigate(['/postings', postingInsert.id]);

      }).catch(error => this.errorHandlerService.handle(error));
  }

  alterPosting() {
    this.postingService.update(this.form.value)
      .then(posting => {
        this.form.patchValue(posting);

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
    this.title.setTitle(`Edição de lançamento: ${this.form.get('description').value}`);
  }
}
