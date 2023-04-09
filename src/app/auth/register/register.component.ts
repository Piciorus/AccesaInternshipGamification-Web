import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/libs/AuthService/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public username!: string;
  public password!: string;
  public email!: string;
  public registrationSuccess = false;

  constructor(private authService: AuthService, private router: Router) {}

  public async onSubmit() {
    try {
      const result = await this.authService
        .register(this.username, this.password, this.email)
        .toPromise();

      this.registrationSuccess = true;
    } catch (error) {
      this.registrationSuccess = false;
    }
  }
}
