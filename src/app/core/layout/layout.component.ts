import { Component } from '@angular/core';
import { AuthService } from 'src/app/libs/AuthService/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(private authService:AuthService) { }
  
  public logout(){
    this.authService.logout();
  }
  

}
