import { NgModule } from '@angular/core';

import { PostingsListComponent } from './postings-list/postings-list.component';
import { PostingRegisterComponent } from './posting-register/posting-register.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../security/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PostingsListComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_PESQUISAR_LANCAMENTO']
    }
  },
  {
    path: 'new',
    component:
    PostingRegisterComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CADASTRAR_LANCAMENTO']
    }
  },
  {
    path: ':id',
    component:
    PostingRegisterComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CADASTRAR_LANCAMENTO']
    }
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostingRoutingModule { }
