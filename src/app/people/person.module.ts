import { PersonRegisterComponent } from './person-register/person-register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';

import { SharedModule } from './../shared/shared.module';

import { PeopleListComponent } from './people-list/people-list.component';

@NgModule({
  declarations: [
    PeopleListComponent,
    PersonRegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputMaskModule,
    ButtonModule,
    TableModule,
    TooltipModule,

    SharedModule
  ],
  exports: [
    PeopleListComponent,
    PersonRegisterComponent
  ]
})
export class PersonModule { }
