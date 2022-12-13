import { Component } from '@angular/core';
import { Credentials } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private storeService: StoreService
  ) {}

  loginForm: Credentials = {
    email: '',
    password: '',
  };

  login() {
    this.authService.login(this.loginForm).subscribe((res) => {
      this.storeService.addToken(res.access_token);
    });
  }
}
