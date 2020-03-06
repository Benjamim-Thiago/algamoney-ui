import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router) { }

  login(email: string, password: string) {
    this.authService.login(email, password)
    .then(() => {
      this.router.navigate(['/dashboard']);
    })
    .catch(error => {
      this.errorHandlerService.handle(error);
    });
  }

  ngOnInit() {
  }

}
