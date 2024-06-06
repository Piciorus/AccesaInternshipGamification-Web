import { Component } from '@angular/core';
import { AuthService } from 'src/app/libs/auth/auth.service';
import * as CryptoJS from 'crypto-js';
import { ERole } from 'src/app/libs/models/erole';
import { ERoleMapping } from 'src/app/libs/models/erole-mapping';

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
  private key: string = '1234567890123456';
  protected readonly ERoleMapping = ERoleMapping;
  protected roleList: ERole[] = [ERole.Admin, ERole.User];
  public role1:any;
  constructor(private readonly authService: AuthService) {}

  public onSubmit(): void {
    const encryptedPassword = this.encrypt(this.key, this.password);
    const role = ERole.User;

    this.authService
      .register(this.username, encryptedPassword, this.email, role)
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

  encrypt(key: any, value: string) {
    key = CryptoJS.enc.Utf8.parse(key);
    return CryptoJS.AES.encrypt(value, key, { iv: key }).toString();
  }
}
