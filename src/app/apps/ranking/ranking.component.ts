import { Component } from '@angular/core';
import { AuthService } from 'src/app/libs/AuthService/auth.service';
import { User } from 'src/app/libs/Models/User';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/libs/Services/User/user.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent {
  public users: Array<User> = [];
  public user: any;
  public userId: any;
  public currentUserIndex: number | undefined; 

  constructor(private readonly userService: UserService,private readonly authService:AuthService) {}

  ngOnInit(): void {
    this.getAllUser();
    this.user = this.authService.getUser();
    this.userId = this.user.id;
  }

  public getAllUser():void {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
    });
  }

  public getUsersSortedByTokensAscending():void {
    this.userService.getUsersSortedByTokensAscending().subscribe((response) => {
      this.users = response;
    });
  }

  public getUsersSortedByTokensDescending():void {
    this.userService.getUsersSortedByTokensDescending().subscribe((response) => {
      this.users = response;
    });
  }
}
