import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { QuestService } from 'src/app/libs/services/quest.service';
import { BadgeService } from 'src/app/libs/services/badge.service';
import { Quest } from 'src/app/libs/models/quest';
import { User } from 'src/app/libs/models/user';

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
    this.updateStatistics('updateStatistics');
  }

  public updateStatistics(event: any): void {
    if (event === 'updateStatistics') {
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
