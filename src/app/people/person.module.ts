import { PersonRegisterComponent } from './person-register/person-register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';

import { SharedModule } from './../shared/shared.module';

import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleRoutingModule } from './people.routing.module';
import { PersonRegisterContactComponent } from './person-register-contact/person-register-contact.component';

@NgModule({
  declarations: [
    PeopleListComponent,
    PersonRegisterComponent,
    PersonRegisterContactComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    PanelModule,
    DialogModule,

    SharedModule,
    PeopleRoutingModule
  ],
  exports: []
})
export class PersonModule { }
