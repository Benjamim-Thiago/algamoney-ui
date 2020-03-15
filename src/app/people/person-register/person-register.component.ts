import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { Person } from 'src/app/models/person';
import { Address } from 'src/app/models/address';
import { PersonService } from '../person.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Contact } from 'src/app/models/contact';


@Component({
  selector: 'app-person-register',
  templateUrl: './person-register.component.html',
  styleUrls: ['./person-register.component.css']
})
export class PersonRegisterComponent implements OnInit {
  person = new Person();
  contact: Contact;
  displayContactForm: boolean;
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

  prepareNewContact() {
    this.displayContactForm = true;
    this.contact = new Contact();
  }

  confirmeContact(frm: NgForm) {
    this.person.contacts.push(this.cloneContact(this.contact));

    this.displayContactForm = false;

    frm.reset();
  }

  cloneContact(contact: Contact): Contact {
    return new Contact(contact.id,
      contact.name, contact.email, contact.phoneNumber);
  }


  get editing() {
    return Boolean(this.person.id);
  }

  new(form: NgForm) {
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
  save(form: NgForm) {
    if (this.editing) {
      this.alterPerson(form);
    } else {
      this.addPerson(form);
    }
  }

  addPerson(form: NgForm) {
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
  alterPerson(form: NgForm) {
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
