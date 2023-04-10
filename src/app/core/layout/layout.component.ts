import { Component } from '@angular/core';
import { AuthService } from 'src/app/libs/AuthService/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  public username!: string;
  public user:any;

  constructor(private readonly authService: AuthService) {}

  public logout(): void {
    this.authService.logout();
  }

  ngOnInit():void{
    this.getUser();
  }

  public getUser():void{
    this.user = this.authService.getUser();
    this.username=this.user.username;
  }
}
