import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PeopleListComponent } from './people-list/people-list.component';
import { PersonRegisterComponent } from './person-register/person-register.component';
import { AuthGuard } from '../security/auth.guard';

const routes: Routes = [
  {
    path: 'people',
    component: PeopleListComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_PESQUISAR_PESSOA']
    }
  },
  {
    path: 'people/new',
    component: PersonRegisterComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CADASTRAR_PESSOA']
    }
  },
  {
    path: 'people/:id',
    component: PersonRegisterComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CADASTRAR_PESSOA']
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
