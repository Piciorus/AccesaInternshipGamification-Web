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

  questionsList:any[]=[]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  clearSelections() {
    this.selectedCategory.reset(); // Clear the selected category options
    this.selectedDifficulty.reset(); // Clear the selected difficulty option
  }
  constructor(
    private readonly questionService: QuestionService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}
  selectedCategory = new FormControl(); // Define the selectedCategory FormControl
  selectedDifficulty = new FormControl(); // Define FormControl for difficulty selection

  // Example categories array, replace this with your actual data
  categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
    // Add more categories as needed
  ];
  ngOnInit(): void {
    this.initQuestions();
  }  currentQuestionIndex: number = 0; // Track the index of the current question

  nextQuestion(): void {
    // Increment the current question index
    this.currentQuestionIndex++;
  
    // Check if the current question index exceeds the length of the questions list
    if (this.currentQuestionIndex >= this.questionsList.length) {
      // If so, reset the index to loop back to the first question
      this.currentQuestionIndex = 0;
    }
  
    // You can perform any additional logic here if needed
    
    // Optionally, you can announce the next question using LiveAnnouncer
    const nextQuestionText = this.questionsList[this.currentQuestionIndex].questionText;
    this._liveAnnouncer.announce(`Next question: ${nextQuestionText}`);
  }
  
  
  initQuestions() {
    this.questionService
      .getAllQuestions()
      .pipe(take(1))
      .subscribe((response: any[]) => {
        const transformedData: any[] = response.map(item => ({
          id: item.id,
          questionText: item.questionText,
          answers: [item.answer1, item.answer2, item.answer3], 
          correctAnswer: item.correctAnswer,
          rewarded: item.rewarded,
          difficulty: item.difficulty,
          threshold: item.threshold,
          questRewardTokens: item.questRewardTokens,
          checkByAdmin: item.checkByAdmin,
          category: item.category
        }));
        this.questionsList = transformedData.filter(question => question.checkByAdmin);
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
