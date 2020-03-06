import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './core/page-not-found.component';
import { NotAuthorizedComponent } from './core/not-authorized.component';

const routes: Routes = [
  {
    path: 'postings',
    loadChildren: () => import('./postings/posting.module')
    .then(m => m.PostingModule)
  },
  {
    path: 'people',
    loadChildren: () => import('./people/person.module')
    .then(m => m.PersonModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module')
    .then(m => m.DashboardModule)
  },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'page-not-found' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
