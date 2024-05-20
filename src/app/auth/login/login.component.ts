import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { AuthorizationService } from 'src/app/libs/auth/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public username!: string;
  public password!: string;
  public loginFailed = false;
  public isLoading = false;

  constructor(
    private readonly authService: AuthService,
    private readonly authorizationService: AuthorizationService,
    private readonly toastrService: ToastrService,
    private router: Router
  ) {}

  public onSubmit() {
    try {
      this.isLoading = true; 
      this.authService
        .login(this.username, this.password)
        .subscribe((response: any) => {
          if (response.jwttoken) {
            this.authorizationService.getUserRoles();
            this.toastrService.success('Log in succesfully!')
            this.authService.setUser(this.authService.getUser());
            this.router.navigateByUrl('/app/home');
          } else {
            this.loginFailed = true;
            console.log('failed')
          }
        });
    } catch (error) {
      this.loginFailed = true;
      console.log('failed')

    } finally {
      this.isLoading = false; 
      console.log('failed')

    }
  }

  public async logout(): Promise<void> {
    this.authService.logout();
  }

  public goToRegister(): void {
    this.router.navigateByUrl('/auth/register');
  }
}
