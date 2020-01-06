import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import {ToastyModule} from 'ng2-toasty';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

import { CoreModule } from './core/core.module';
import { PersonModule } from './people/person.module';
import { PostingModule } from './postings/posting.module';

import { AppComponent } from './app.component';
import { PostingService } from './postings/posting.service';
import { PersonService } from './people/person.service';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ConfirmDialogModule,
    //
    ToastyModule.forRoot(),
    //
    CoreModule,
    PostingModule,
    PersonModule
  ],
  providers: [
    PostingService,
    PersonService,
    //
    {provide: LOCALE_ID, useValue: 'pt'},
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
