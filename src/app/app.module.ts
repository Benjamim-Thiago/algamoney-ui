import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {SelectButtonModule} from 'primeng/selectbutton';
import {CalendarModule} from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';

import { AppComponent } from './app.component';
import { ListPostingsComponent } from './list-postings/list-postings.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListPeopleComponent } from './list-people/list-people.component';
import { RegisterPostingComponent } from './register-posting/register-posting.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListPostingsComponent,
    ListPeopleComponent,
    RegisterPostingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    InputTextareaModule,
    SelectButtonModule,
    CalendarModule,
    ButtonModule,
    TableModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
