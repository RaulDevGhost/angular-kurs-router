import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User, CreateUserDTO } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiURL = `${environment.API_URL}/api/users`;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(`${this.apiURL}`);
  }

  createUser(user: CreateUserDTO) {
    return this.http.post<CreateUserDTO>(`${this.apiURL}`, user);
  }
}
