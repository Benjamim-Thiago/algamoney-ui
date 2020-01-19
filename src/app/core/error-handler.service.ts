import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastyService } from 'ng2-toasty';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toastService: ToastyService) { }

  handle(errorResponse: any) {
    let message: string;

    if (typeof errorResponse === 'string') {
      message = errorResponse;
    }  else if (errorResponse instanceof HttpErrorResponse
        && errorResponse.status >= 400 && errorResponse.status <= 499) {
      message = 'Ocorreu um erro ao processar a sua solicitação';

      if (errorResponse.error[0]) {
        message = errorResponse.error[0].userMessage;
      }

    } else {
      message = 'Erro ao processar serviço remoto. Tente novamente';
      console.log('Ocorreu um erro', errorResponse);
    }
    this.toastService.error(message);
  }
}
