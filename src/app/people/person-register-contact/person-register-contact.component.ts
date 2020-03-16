import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-person-register-contact',
  templateUrl: './person-register-contact.component.html',
  styleUrls: ['./person-register-contact.component.css']
})
export class PersonRegisterContactComponent implements OnInit {
  @Input() contacts: Array<Contact>;
  contact: Contact;
  displayContactForm: boolean;
  contactIndex: number;

  constructor() { }

  ngOnInit() {
  }

  prepareNewContact() {
    this.displayContactForm = true;
    this.contact = new Contact();
    this.contactIndex = this.contacts.length;
  }

  prepareAlterContact(contact: Contact, index: number) {
    this.contact = this.cloneContact(contact);
    this.displayContactForm = true;
    this.contactIndex = index;
  }

  confirmeContact(frm: NgForm) {
    this.contacts[this.contactIndex] = this.cloneContact(this.contact);
    this.displayContactForm = false;

    frm.reset();
  }

  removeContact(index: number) {
    this.contacts.splice(index, 1);
  }

  cloneContact(contact: Contact): Contact {
    return new Contact(contact.id,
      contact.name, contact.email, contact.phoneNumber);
  }

  get editing() {
    return this.contact && this.contact.id;
  }
}
