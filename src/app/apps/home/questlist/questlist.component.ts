import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
export class QuestlistComponent implements OnInit {
  @Input() questList: Array<Quest> = [];
  @Output() public newItemEvent: EventEmitter<any> = new EventEmitter<any>();
  public correctAnswer = false;
  public errorMessage: string;
  public answer = '';
  public answerForm: FormGroup;

  public constructor(
    private readonly questService: QuestService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.answerForm = this.initForm();
  }

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
        this.answerForm.get('answer')?.setValue('');
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

  private initForm(): FormGroup {
    return this.formBuilder.group({
      answer: [this.answer],
    });
  }
}
