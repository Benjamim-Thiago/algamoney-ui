import { PostingModule } from './posting/posting.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputMaskModule} from 'primeng/inputmask';
import {SelectButtonModule} from 'primeng/selectbutton';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListPeopleComponent } from './list-people/list-people.component';
import { RegisterPersonComponent } from './register-person/register-person.component';
import { MessageComponent } from './message/message.component';
import { PeopleGridComponent } from './people-grid/people-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListPeopleComponent,
    RegisterPersonComponent,
    MessageComponent,
    PeopleGridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    //
    PostingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
