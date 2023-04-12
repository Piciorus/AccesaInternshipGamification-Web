import { Component, EventEmitter, Input, Output } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { Quest } from 'src/app/libs/models/quest';
import { QuestService } from 'src/app/libs/services/quest.service';
import { UserService } from 'src/app/libs/services/user.service';

@Component({
  selector: 'app-questlist',
  templateUrl: './questlist.component.html',
  styleUrls: ['./questlist.component.scss'],
})
export class QuestlistComponent {
  @Input() questList: Array<Quest> = [];
  @Output() public newItemEvent: EventEmitter<any> = new EventEmitter<any>();
  public correctAnswer = false;
  public errorMessage: string;

  public constructor(
    private readonly questService: QuestService,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  public getQuests(): void {
    this.questService
      .getQuests()
      .pipe(take(1))
      .subscribe((response: any) => {
        this.questList = response;
      });
  }

  public resolveQuest(idQuest: number): void {
    this.questService
      .resolveQuest(idQuest, this.authService.getUser().id)
      .pipe(take(1))
      .subscribe(() => {
        this.authService.getMe();
        this.newItemEvent.emit('updateStatistics');
      });
  }

  public updateThreshold(idUser: number, threshold: number): void {
    this.userService
      .updateThreshold(idUser, threshold)
      .pipe(take(1))
      .subscribe();
  }

  public updateRewarded(idQuest: number, rewarded: boolean): void {
    this.questService
      .updateRewarded(idQuest, rewarded)
      .pipe(take(1))
      .subscribe(() => {
        this.getQuests();
      });
  }

  public checkAnswer(answer: string, questId: number): void {
    this.questService
      .checkAnswer(this.authService.getUser().id, answer, questId)
      .pipe(take(1))
      .subscribe((response: any) => {
        if (response) {
          this.resolveQuest(questId);
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Incorrect answer!';
        }
      });
  }
}
