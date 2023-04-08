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

  constructor(private authService: AuthService, private router: Router) {}

  public async onSubmit() {
    const rez = await this.authService
      .login(this.username, this.password)
      .toPromise();
    if (rez) {
      this.router.navigateByUrl('/app/home');
    }
  }

  public async logout() {
    this.authService.logout();
  }

  public goToRegister() {
    this.router.navigateByUrl('/auth/register');
  }

  
}
