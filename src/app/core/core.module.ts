import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastyModule} from 'ng2-toasty';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { PersonService } from '../people/person.service';
import { PostingService } from '../postings/posting.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    ConfirmDialogModule,
    ToastyModule.forRoot(),
  ],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    PostingService,
    PersonService,
    ErrorHandlerService,

    {provide: LOCALE_ID, useValue: 'pt-BR'},
    ConfirmationService
  ]
})
export class CoreModule { }
