import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Person } from 'src/app/models/person';
import { PersonService } from '../person.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Address } from 'src/app/models/address';


@Component({
  selector: 'app-person-register',
  templateUrl: './person-register.component.html',
  styleUrls: ['./person-register.component.css']
})
export class PersonRegisterComponent implements OnInit {
  person = new Person();
  constructor(
    private personService: PersonService,
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const personCode = this.route.snapshot.params['id'];
    this.title.setTitle('Nova pessoa');
    if (personCode) {
      this.loadPerson(personCode);
    }
  }

  get editing() {
    return Boolean(this.person.id);
  }

  new(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.person = new Person();
    }.bind(this), 1);

    this.router.navigate(['/people/new']);
  }

  loadPerson(id) {
    this.personService.findById(id)
    .then(person => {
      if (!person.address) {
        person.address = new Address();
      }
      this.person = person;
      this.editTitlePageModeEditing();
    }).catch(error => this.errorHandlerService.handle(error));
  }
  save(form: FormControl) {
    if (this.editing) {
      this.alterPerson(form);
    } else {
      this.addPerson(form);
    }
  }

  addPerson(form: FormControl) {
    if (this.person.address.zipcode) {
      this.person.address.zipcode = this.person.address.zipcode
      .replace('.', '')
      .replace('-', '');
      this.person = this.person;
    }
    this.personService.save(this.person)
      .then(() => {
        this.toastyService.success('Lançamento cadstrado com sucesso.');

        form.reset();
        this.person = new Person();

      }).catch(error => this.errorHandlerService.handle(error));
  }
  alterPerson(form: FormControl) {
    if (this.person.address.zipcode) {
      this.person.address.zipcode = this.person.address.zipcode
      .replace('.', '')
      .replace('-', '');
      this.person = this.person;
    }

    this.personService.update(this.person)
      .then(person => {
        this.person = person;

        this.toastyService.success('Pessoa alterada com sucesso.');
        this.editTitlePageModeEditing();
      }).catch(error => this.errorHandlerService.handle(error));
  }

  editTitlePageModeEditing() {
    this.title.setTitle(`Edição da pessoa: ${this.person.name}`);
  }
}
