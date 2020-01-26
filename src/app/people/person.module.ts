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
import { PeopleRoutingModule } from './people.routing.module';

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

    SharedModule,
    PeopleRoutingModule
  ],
  exports: []
})
export class PersonModule { }
