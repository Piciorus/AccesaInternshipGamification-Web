import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { Quest } from 'src/app/libs/models/quest';
import { QuestService } from 'src/app/libs/services/quest.service';
import { QuestionService } from 'src/app/libs/services/question.service';
import { UserService } from 'src/app/libs/services/user.service';

@Component({
  selector: 'app-questlist',
  templateUrl: './questlist.component.html',
  styleUrls: ['./questlist.component.scss'],
})
export class QuestlistComponent implements OnInit {
  // @Input() questList: Array<Quest> = [];
  // @Output() public newItemEvent: EventEmitter<any> = new EventEmitter<any>();
  // public correctAnswer = false;
  // public errorMessage: string;
  // public answer = '';
  // public answerForm: FormGroup;

  // public constructor(
  //   private readonly questService: QuestService,
  //   private readonly userService: UserService,
  //   private readonly authService: AuthService,
  //   private readonly formBuilder: FormBuilder
  // ) {}

  // ngOnInit(): void {
  //   this.answerForm = this.initForm();
  // }

  // public getQuests(): void {
  //   this.questService
  //     .getQuests()
  //     .pipe(take(1))
  //     .subscribe((response: any) => {
  //       this.questList = response;
  //     });
  // }

  // public resolveQuest(idQuest: number): void {
  //   this.questService
  //     .resolveQuest(idQuest, this.authService.getUser().id)
  //     .pipe(take(1))
  //     .subscribe(() => {
  //       this.answerForm.get('answer')?.setValue('');
  //       this.authService.getMe();
  //       this.newItemEvent.emit('updateStatistics');
  //     });
  // }

  // public updateThreshold(idUser: number, threshold: number): void {
  //   this.userService
  //     .updateThreshold(idUser, threshold)
  //     .pipe(take(1))
  //     .subscribe();
  // }

  // public updateRewarded(idQuest: number, rewarded: boolean): void {
  //   this.questService
  //     .updateRewarded(idQuest, rewarded)
  //     .pipe(take(1))
  //     .subscribe(() => {
  //       this.getQuests();
  //     });
  // }

  // public checkAnswer(answer: string, questId: number): void {
  //   this.questService
  //     .checkAnswer(this.authService.getUser().id, answer, questId)
  //     .pipe(take(1))
  //     .subscribe((response: any) => {
  //       if (response) {
  //         this.resolveQuest(questId);
  //         this.errorMessage = '';
  //       } else {
  //         this.errorMessage = 'Incorrect answer!';
  //       }
  //     });
  // }

  // private initForm(): FormGroup {
  //   return this.formBuilder.group({
  //     answer: [this.answer],
  //   });
  // }
  displayedColumns: string[] = [
    'questionText',
    'answer1',
    'answer2',
    'answer3',
    'correctAnswer',
    'rewarded',
    'difficulty',
    'threshold',
    'questRewardTokens',
    'category',
  ];

  columnHeaders: string[] = [
    'Question Text',
    'First Answer',
    'Second Answer',
    'Third Answer',
    'Correct Answer',
    'Rewarded',
    'Difficulty',
    'Threshold',
    'Tokens',
    'Category',
  ];

  dataSource = new MatTableDataSource<Quest>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private readonly questionService: QuestionService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.initQuestions();
  }

  initQuestions() {
    this.questionService
      .getAllQuestions()
      .pipe(take(1))
      .subscribe((response: any[]) => {
        this.dataSource.data = response.filter(question => question.checkByAdmin);
      });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
