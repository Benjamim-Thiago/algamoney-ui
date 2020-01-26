import { NgModule } from '@angular/core';

import { PostingsListComponent } from './postings-list/postings-list.component';
import { PostingRegisterComponent } from './posting-register/posting-register.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'postings', component: PostingsListComponent },
  { path: 'postings/new', component: PostingRegisterComponent },
  { path: 'postings/:id', component: PostingRegisterComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostingRoutingModule { }
