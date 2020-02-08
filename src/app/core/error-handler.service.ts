import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { NotAuthenticatedError } from './../security/money-http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private toastService: ToastyService,
    private router: Router) { }

  handle(errorResponse: any) {
    let message: string;

    if (typeof errorResponse === 'string') {
      message = errorResponse;

    } else if (errorResponse instanceof NotAuthenticatedError) {
      message = 'Sua sessão expirou!';
      this.router.navigate(['/login']);

    }  else if (errorResponse instanceof HttpErrorResponse
        && errorResponse.status >= 400 && errorResponse.status <= 499) {
      message = 'Ocorreu um erro ao processar a sua solicitação';

      if (errorResponse.error[0]) {
        message = errorResponse.error[0].userMessage;
      }

      if (errorResponse.status === 403) {
        message = 'Você não tem permissão para executar esta ação';
      }

    } else {
      message = 'Erro ao processar serviço remoto. Tente novamente';
      console.log('Ocorreu um erro', errorResponse);
    }
    this.toastService.error(message);
  }
}
