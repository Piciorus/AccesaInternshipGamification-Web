import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { Quest } from 'src/app/libs/models/quest';
import { User } from 'src/app/libs/models/user.model';
import { QuestService } from 'src/app/libs/services/quest.service';

@Component({
  selector: 'app-quest-answered',
  templateUrl: './quest-answered.component.html',
  styleUrls: ['./quest-answered.component.scss'],
})
export class QuestAnsweredComponent implements OnInit {
  questList: Array<Quest> = [];
  user: User;

  constructor(private readonly questService: QuestService,private readonly authService:AuthService) {}

  ngOnInit() {
    this.getQuestsResolved();
  }

  public getQuestsResolved(): void {
    this.authService
    .getMe()
    .pipe(take(1))
    .subscribe((user: User) => {  
      user = this.authService.getUser();
    });
    this.questService
      .getAllResolvedQuests(this.authService.getUser().id)
      .pipe(take(1))
      .subscribe((response: any) => {
        this.questList = response;
      });
  }
}
