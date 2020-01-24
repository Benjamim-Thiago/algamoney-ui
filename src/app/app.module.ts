import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { CoreModule } from './core/core.module';
import { PersonModule } from './people/person.module';
import { PostingModule } from './postings/posting.module';

import { AppComponent } from './app.component';
import { PostingsListComponent } from './postings/postings-list/postings-list.component';
import { PostingRegisterComponent } from './postings/posting-register/posting-register.component';
import { PeopleListComponent } from './people/people-list/people-list.component';

registerLocaleData(localePt);

const routes: Routes = [
  { path: 'postings', component: PostingsListComponent },
  { path: 'postings/new', component: PostingRegisterComponent },
  { path: 'postings/:id', component: PostingRegisterComponent },
  { path: 'people', component: PeopleListComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    //
    CoreModule,
    PostingModule,
    PersonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
