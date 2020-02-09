import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl: string;
  tokensRevokeUrl: string;
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService) {
      this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
      console.log('teste: ' + this.oauthTokenUrl);
      this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
      this.loadToken();
    }

  login(email: string, password: string): Promise<void> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${email}&password=${password}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body,
      { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.storegedToken(response['access_token']);
      })
      .catch(response => {
        const responseError = response.error;
        if (response.status === 400) {
          if (responseError.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida');
          }
        }

        return Promise.reject(response);
    });
  }

  getNewAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body,
        { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.storegedToken(response['access_token']);

        // console.log('Novo access token criado!');

        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  clearAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload =  null;
  }

  isAccessTokenInvalid() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired();
  }

  hasPermission(role) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(role);
  }

  hasAnyPermission(roles) {
    for (const role of roles) {
      if (this.hasPermission(role)) {
        return true;
      }
    }

    return false;
  }

  private storegedToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private loadToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.storegedToken(token);
    }
  }

  logout() {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.clearAccessToken();
      });
  }
}
