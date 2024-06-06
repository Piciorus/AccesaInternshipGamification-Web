import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { AuthorizationService } from 'src/app/libs/auth/authorization.service';
import CryptoJS from 'crypto-js';

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
  private key: string = '1234567890123456';

  constructor(
    private readonly authService: AuthService,
    private readonly authorizationService: AuthorizationService,
    private readonly toastrService: ToastrService,
    private router: Router
  ) {}

  encrypt(key: any, value: string) {
    key = CryptoJS.enc.Utf8.parse(key);
    return CryptoJS.AES.encrypt(value, key, { iv: key }).toString();
  }
  public onSubmit() {
    const encryptedPassword = this.encrypt(this.key, this.password);

    try {
      this.isLoading = true; 
      this.authService
        .login(this.username, encryptedPassword )
        .subscribe((response: any) => {
          if (response.jwttoken) {
            sessionStorage.setItem('token', response.jwttoken);

            this.authorizationService.getUserRoles();
            this.toastrService.success('Log in succesfully!')
            this.authService.setUser(this.authService.getUser());
            this.authService.setCurrentUser(
              this.authService.getLoggedInUsername()
            );
            this.router.navigateByUrl('/app/home');
          } else {
            this.loginFailed = true;
          }
        });
    } catch (error) {
      this.loginFailed = true;

    } finally {
      this.isLoading = false; 
    }
  }

  public async logout(): Promise<void> {
    this.authService.logout();
  }

  public goToRegister(): void {
    this.router.navigateByUrl('/auth/register');
  }
}
