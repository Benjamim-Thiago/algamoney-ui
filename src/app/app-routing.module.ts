import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';

import { PostingsListComponent } from './postings/postings-list/postings-list.component';
import { PostingRegisterComponent } from './postings/posting-register/posting-register.component';
import { PeopleListComponent } from './people/people-list/people-list.component';
import { PageNotFoundComponent } from './core/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'postings', pathMatch: 'full' },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'page-not-found' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
