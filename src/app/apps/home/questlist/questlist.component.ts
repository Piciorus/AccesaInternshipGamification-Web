import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { Category } from 'src/app/libs/models/category';
import { Filters, UserAnswerRequest } from 'src/app/libs/models/question';
import { User } from 'src/app/libs/models/user';
import { CategoryService } from 'src/app/libs/services/category.service';
import { QuestionService } from 'src/app/libs/services/question.service';
import { UserService } from 'src/app/libs/services/user.service';

@Component({
  selector: 'app-questlist',
  templateUrl: './questlist.component.html',
  styleUrls: ['./questlist.component.scss'],
})
export class QuestlistComponent implements OnInit {
  @Output() public newItemEvent: EventEmitter<any> = new EventEmitter<any>();
  public questionsList: any[] = [];
  public selectedCategory = new FormControl();
  public selectedDifficulty = new FormControl();
  public answerForm!: FormGroup;
  public categories: any[] = [];
  public selectedAnswer!: string | null;
  public currentQuestionIndex: number = 0;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly questionService: QuestionService,
    private readonly categoryService: CategoryService,
    private _liveAnnouncer: LiveAnnouncer,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.answerForm = this.initForm();
    this.initCategories();
    this.initQuestions();
  }

  public clearSelections() {
    this.selectedCategory.reset(null);
    this.selectedDifficulty.reset(null);
    this.initQuestions();
  }

  public onSelectionChange(event: any): void {
    this.initQuestions();
  }

  public updateSelectedAnswer(answer: string): void {
    this.selectedAnswer = this.selectedAnswer === answer ? null : answer;
    this.answerForm.get('selectedAnswer')?.setValue(this.selectedAnswer);
  }

  public nextQuestion(): void {
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questionsList.length) {
      this.currentQuestionIndex = 0;
    }

    const nextQuestionText =
      this.questionsList[this.currentQuestionIndex].questionText;
    this._liveAnnouncer.announce(`Next question: ${nextQuestionText}`);
  }

  public backQuestion(): void {
    this.currentQuestionIndex--;

    if (this.currentQuestionIndex >= this.questionsList.length) {
      this.currentQuestionIndex = 0;
    }

    const nextQuestionText =
      this.questionsList[this.currentQuestionIndex].questionText;
    this._liveAnnouncer.announce(`Next question: ${nextQuestionText}`);
  }

  submitAnswer() {
    const selectedAnswer = this.answerForm.value.selectedAnswer;
    const currentQuestion = this.questionsList[this.currentQuestionIndex];

    if (!selectedAnswer) {
      this.toastr.error('Please select an answer before submitting!');
      return;
    }

    const isCorrect = currentQuestion.correctAnswer === selectedAnswer;
    const idQuestion = currentQuestion.id;
    const id = this.authService.getUser().id;
    const request = {
      userAnswer: selectedAnswer,
    };

    if (isCorrect) {
      this.updateThreshold(idQuestion, id);
      this.resolveQuestionForUser(id, idQuestion, request);
      this.toastr.success('Correct answer!');
    } else {
      this.resolveQuestionForUser(id, idQuestion, request);
      this.toastr.error('Incorect answer!');
    }

    setTimeout(() => {
      this.nextQuestion();
    }, 1000);
  }

  public update() {
    this.authService
      .getMe()
      .pipe(take(1))
      .subscribe((user: User) => {
        user.id = this.authService.getUser().id;
        this.authService.setUser(user);
        this.newItemEvent.emit('updateStatistics');
      });
  }

  public resolveQuestionForUser(
    idUser: number,
    idQuestion: number,
    userAnswer: UserAnswerRequest
  ) {
    this.questionService
      .markResolvedQuestion(idUser, idQuestion, userAnswer)
      .subscribe(() => {});
    this.update();
  }

  public updateThreshold(idQuestion: number, idUser: number) {
    this.questionService
      .resolveQuestion(idQuestion, idUser)
      .subscribe(() => {});
    this.update();
  }

  public getSelectedAnswers(): string[] {
    const selectedAnswers: string[] = [];
    const currentQuestion = this.questionsList[this.currentQuestionIndex];

    currentQuestion.answers.forEach((answer: string) => {
      const checkbox = document.getElementById(answer) as HTMLInputElement;
      if (checkbox.checked) {
        selectedAnswers.push(answer);
      }
    });

    return selectedAnswers;
  }

  public checkAnswers(
    selectedAnswers: string[],
    correctAnswers: string[]
  ): boolean {
    return selectedAnswers.every((selectedAnswer) =>
      correctAnswers.includes(selectedAnswer)
    );
  }

  public initCategories() {
    this.categoryService
      .getAllCategories()
      .pipe(take(1))
      .subscribe((response: Category[]) => {
        this.categories = response;
      });
  }
  public initQuestions() {
    const category = this.selectedCategory.value;
    const difficulty = this.selectedDifficulty.value;
    const id = this.authService.getUser().id;

    this.questionService
      .getUnansweredQuestionsForUser(id, category, difficulty)
      .pipe(take(1))
      .subscribe((response: any[]) => {
        const transformedData: any[] = response.map((item) => ({
          id: item.id,
          questionText: item.questionText,
          answers: [item.answer1, item.answer2, item.answer3],
          correctAnswer: item.correctAnswer,
          rewarded: item.rewarded,
          difficulty: item.difficulty,
          threshold: item.threshold,
          questRewardTokens: item.questRewardTokens,
          checkByAdmin: item.checkByAdmin,
          category: item.category,
        }));
        this.questionsList = transformedData.filter(
          (question) => question.checkByAdmin
        );        console.log(this.questionsList)

      });
  }

  public announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  private initForm() {
    return this.formBuilder.group({
      selectedAnswer: [null],
    });
  }
}
