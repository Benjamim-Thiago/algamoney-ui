import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsPostingsComponent } from './reports-postings/reports-postings.component';
import { AuthGuard } from '../security/auth.guard';


const routes: Routes = [
  {
    path: 'postings',
    component: ReportsPostingsComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_PESQUISAR_LANCAMENTO']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
