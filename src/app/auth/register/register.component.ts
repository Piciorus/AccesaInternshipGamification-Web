import { Component } from '@angular/core';
import { AuthService } from 'src/app/libs/auth/auth.service';

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
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  succesMessage = '';

  constructor(private readonly authService: AuthService) {}

  public onSubmit(): void {
    this.authService
      .register(this.username, this.password, this.email)
      .subscribe({
        next: (response) => {
          this.isSuccessful = true;
          this.succesMessage = response.message;
          this.errorMessage = '';
          if (response.statusCode === 400) {
            this.isSignUpFailed = true;
            this.isSuccessful = false;
            this.errorMessage = response.message;
          }
        },
      });
  }
}
