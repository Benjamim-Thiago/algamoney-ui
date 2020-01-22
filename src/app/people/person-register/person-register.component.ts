import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Person } from 'src/app/models/person';
import { PersonService } from '../person.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

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
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  save(form: FormControl) {
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
}
