import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { User } from 'src/app/libs/models/user.model';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { Quest } from 'src/app/libs/models/quest';
import { QuestService } from 'src/app/libs/services/quest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public questList: Array<Quest> = [];
  public statistics: any;
  public constructor(
    private readonly questService: QuestService,
    private readonly authService: AuthService
  ) {}

  public ngOnInit(): void {
    const statistics: any = {
      tokens: this.authService.getUser().tokens,
      thresholdUser: this.authService.getUser().threshold,
    };
    this.statistics = statistics;
    this.questService
      .getQuests()
      .pipe(take(1))
      .subscribe((res) => {
        this.questList = res;
      });
  }

  public updateStatistics(event: any): void {
    if (event === 'updateStatistics') {
      this.questService
        .getQuests()
        .pipe(take(1))
        .subscribe((res) => {
          this.questList = res;
        });
      this.authService
        .getMe()
        .pipe(take(1))
        .subscribe((user: User) => {
          user.id = this.authService.getUser().id;
          this.authService.setUser(user);
          const statistics: any = {
            tokens: this.authService.getUser().tokens,
            thresholdUser: this.authService.getUser().threshold,
          };
          this.statistics = statistics;
        });
    }
  }
}
