import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  public isLoading = false; // Added loading flag

  constructor(
    private readonly authService: AuthService,
    private readonly authorizationService:AuthorizationService,
    private router: Router
  ) {}

  public onSubmit() {
    try {
      this.isLoading = true; // Show spinner during login process
      this.authService
        .login(this.username, this.password)
        .subscribe((response:any)=>{
          if (response) {
            this.authorizationService.getUserRoles();
            this.authService.setUser(this.authService.getUser())
            this.router.navigateByUrl('/app/home');

          } else {
            this.loginFailed = true;
          }
        })
      
    } catch (error) {
      this.loginFailed = true;
    } finally {
      this.isLoading = false; // Hide spinner after login process completes
    }
  }


  public async logout(): Promise<void> {
    this.authService.logout();
  }

  public goToRegister(): void {
    this.router.navigateByUrl('/auth/register');
  }
}
