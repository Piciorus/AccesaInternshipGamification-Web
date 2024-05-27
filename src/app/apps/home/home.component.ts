import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { Quest } from 'src/app/libs/models/quest';
import { User } from 'src/app/libs/models/user';
import { UsersStatisticsComponent } from './users-statistics/users-statistics.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public questList: Array<Quest> = [];
  public statistics: any;

  @ViewChild(UsersStatisticsComponent)
  usersStatisticsComponent: UsersStatisticsComponent;
  @ViewChild('usersStatisticsComponent', { read: ElementRef })
  usersStatisticsComponentRef: ElementRef;

  constructor(private readonly authService: AuthService) {}

  public ngOnInit(): void {
    this.updateStatistics('updateStatistics');
  }

  public updateStatistics(event: any): void {
    if (event === 'updateStatistics' || event === 'questionResolved') {
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

          this.updateUsersStatistics();
        });
    }
  }

  private updateUsersStatistics() {
    if (this.usersStatisticsComponent) {
      this.usersStatisticsComponent.initCorrectAnswersForEachCategory();
    } else {
      console.error('UsersStatisticsComponent is not available');
    }
  }
}
