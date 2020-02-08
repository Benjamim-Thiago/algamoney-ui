import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { SecurityRoutingModule } from './security-routing.module';

import { MoneyHttpInterceptor } from './money-http-interceptor';
import { AuthGuard } from './auth.guard';


export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    SecurityRoutingModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['http://localhost:8080/oauth/token']
      }
  })
  ],
  providers: [
    JwtHelperService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: MoneyHttpInterceptor,
        multi: true
    },
  AuthGuard
  ]
})
export class SecurityModule { }
