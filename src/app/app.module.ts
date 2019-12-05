import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';

import { AppComponent } from './app.component';
import { ListPostingsComponent } from './list-postings/list-postings.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListPeopleComponent } from './list-people/list-people.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListPostingsComponent,
    ListPeopleComponent
  ],
  imports: [
    BrowserModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
