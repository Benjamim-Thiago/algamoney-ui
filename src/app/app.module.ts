import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { PersonModule } from './people/person.module';
import { PostingModule } from './postings/posting.module';

import { AppComponent } from './app.component';
import { PostingService } from './postings/posting.service';
import { PersonService } from './people/person.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    //
    CoreModule,
    PostingModule,
    PersonModule
  ],
  providers: [
    PostingService,
    PersonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
