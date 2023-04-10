import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/libs/AuthService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public username!: string;
  public password!: string;
  public loginFailed = false;

  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}

  public async onSubmit(): Promise<void> {
    try {
      const result = await this.authService
        .login(this.username, this.password)
        .toPromise();
      if (result) {
        this.router.navigateByUrl('/app/home');
      } else {
        this.loginFailed = true;
      }
    } catch (error) {
      this.loginFailed = true;
    }
  }

  public async logout(): Promise<void> {
    this.authService.logout();
  }

  public goToRegister(): void {
    this.router.navigateByUrl('/auth/register');
  }
}
