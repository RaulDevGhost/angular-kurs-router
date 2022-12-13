import { Component } from '@angular/core';
import { CreateUserDTO } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  constructor(private usersService: UsersService) {}
  user: CreateUserDTO = {
    name: '',
    email: '',
    password: '',
  };
  registration() {
    this.usersService.createUser(this.user).subscribe((res) => {
      console.log(res);
    });
  }
}
