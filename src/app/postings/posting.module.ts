import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

import { SharedModule } from './../shared/shared.module';

import { PostingsListComponent } from './postings-list/postings-list.component';
import { PostingRegisterComponent } from './posting-register/posting-register.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PostingRegisterComponent,
    PostingsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    SelectButtonModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CurrencyMaskModule,

    SharedModule
  ],
  exports: [
    PostingsListComponent,
    PostingRegisterComponent
  ]
})
export class PostingModule { }
