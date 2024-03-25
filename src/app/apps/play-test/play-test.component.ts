// play-test.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { QuestionService } from 'src/app/libs/services/question.service';

@Component({
  selector: 'app-play-test',
  templateUrl: './play-test.component.html',
  styleUrls: ['./play-test.component.scss'],
})
export class PlayTestComponent implements OnInit {
  public questionList: Array<any> = [];
  public currentQuestionIndex: number = 0;
  public selectedAnswers: any = {};
  public showResults: boolean = false;
  public results: Array<boolean> = [];

  constructor(
    private readonly questionService: QuestionService,
    private dialogRef: MatDialogRef<PlayTestComponent>
  ) {}

  public ngOnInit(): void {
    this.initQuestions();
  }

  initQuestions() {
    this.questionService
      .getAllQuestions()
      .pipe(take(1))
      .subscribe((response) => {
        this.questionList = response.map(
          (question: { answer1: any; answer2: any; answer3: any }) => {
            return {
              ...question,
              answers: [question.answer1, question.answer2, question.answer3],
            };
          }
        );
        this.loadCurrentQuestion();
      });
  }

  loadCurrentQuestion() {
    this.selectedAnswers[this.currentQuestionIndex] = [];
  }

  toggleAnswerSelection(answerIndex: number) {
    const currentSelections = this.selectedAnswers[this.currentQuestionIndex];
    const index = currentSelections.indexOf(answerIndex);
    if (index === -1) {
      currentSelections.push(answerIndex);
    } else {
      currentSelections.splice(index, 1);
    }
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questionList.length) {
      this.loadCurrentQuestion();
    } else {
      this.calculateResults();
      this.showResults = true;
    }
  }

  isSelected(answerIndex: number) {
    return this.selectedAnswers[this.currentQuestionIndex]?.includes(
      answerIndex
    );
  }

  get currentQuestion() {
    return this.questionList[this.currentQuestionIndex];
  }

  closeModal() {
    this.dialogRef.close();
  }

  calculateResults() {
    this.results = this.questionList.map((question, index) => {
      const selected = this.selectedAnswers[index];
      return (
        selected !== undefined &&
        selected.length === 1 &&
        question.answers[selected[0]] === question.correctAnswer
      );
    });
  }
}
