import { PersonRegisterComponent } from './person-register/person-register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleGridComponent } from './people-grid/people-grid.component';



@NgModule({
  declarations: [
    PeopleListComponent,
    PeopleGridComponent,
    PersonRegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    InputMaskModule,
    SelectButtonModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    TableModule,
    TooltipModule,
  ],
  exports: [
    PeopleListComponent,
    PersonRegisterComponent
  ]
})
export class PersonModule { }
