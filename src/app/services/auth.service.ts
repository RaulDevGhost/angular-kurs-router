import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Credentials, Login, Profile } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private apiURL = `${environment.API_URL}/api/auth`;

  login(user: Credentials) {
    return this.http.post<Login>(`${this.apiURL}/login`, user).pipe(
      tap((response) => {
        this.tokenService.saveToken(response.access_token);
      })
    );
  }

  getProfile() {
    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', `Bearer ${token}`);
    // headers = headers.set('Content-type', 'application/json');
    return this.http.get<Profile>(`${this.apiURL}/profile`);
  }
}
