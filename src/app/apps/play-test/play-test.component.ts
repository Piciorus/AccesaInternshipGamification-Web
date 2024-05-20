import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { TestHistory } from 'src/app/libs/models/test-history';
import { ChatGptService } from 'src/app/libs/services/chatgpt.service';
import { QuestionService } from 'src/app/libs/services/question.service';
import { TestsHistoryService } from 'src/app/libs/services/tests-history.service';

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
  public answersSubmitted: boolean = false;
  public chatGptResponse: string = '';
  public chatGptResponses: string[] = [];
  public submissionMade: boolean = false;
  public showSummary: boolean = false;

  constructor(
    private readonly questionService: QuestionService,
    private readonly chatGptService: ChatGptService,
    private readonly authService: AuthService,
    private readonly testsHistoryService: TestsHistoryService,
    private dialogRef: MatDialogRef<PlayTestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initQuestions();
  }

  get currentQuestion() {
    return this.questionList[this.currentQuestionIndex];
  }

  public toggleAnswerSelection(answerIndex: number) {
    const currentSelections = this.selectedAnswers[this.currentQuestionIndex];
    const index = currentSelections.indexOf(answerIndex);
    if (index === -1) {
      currentSelections.push(answerIndex);
    } else {
      currentSelections.splice(index, 1);
    }
  }

  public nextQuestion() {
    this.currentQuestionIndex++;
    this.answersSubmitted = false;
    if (this.currentQuestionIndex < this.questionList.length) {
      this.loadCurrentQuestion();
    } else {
      this.calculateResults();
      this.showResults = true;
      this.saveTestHistory();
    }
  }

  public isMatchingResponse(answer: string): boolean {
    return this.submissionMade && answer === this.chatGptResponse;
  }

  public isCorrectUserResponse(questionIndex: number): boolean {
    const selectedIndexes = this.selectedAnswers[questionIndex];
    if (!selectedIndexes || selectedIndexes.length !== 1) {
      return false;
    }
    const selectedAnswerIndex = selectedIndexes[0];
    const question = this.questionList[questionIndex];
    return question.answers[selectedAnswerIndex] === question.correctAnswer;
  }

  public isCorrectChatGptResponse(questionIndex: number): boolean {
    const question = this.questionList[questionIndex];
    return this.chatGptResponses[questionIndex] === question.correctAnswer;
  }

  public toggleSummary() {
    this.showSummary = !this.showSummary;
  }

  public countUserCorrectAnswers(): number {
    return this.results.filter((result) => result).length;
  }

  public countChatGptCorrectAnswers(): number {
    return this.chatGptResponses.filter((response) => response).length;
  }

  public getSelectedAnswers(questionIndex: number): string {
    const selectedIndexes = this.selectedAnswers[questionIndex];
    if (selectedIndexes && selectedIndexes.length > 0) {
      return selectedIndexes
        .map(
          (index: string | number) =>
            this.questionList[questionIndex].answers[index]
        )
        .join(', ');
    } else {
      return 'No answer selected';
    }
  }

  public isSelected(answerIndex: number) {
    return this.selectedAnswers[this.currentQuestionIndex]?.includes(
      answerIndex
    );
  }

  public isCorrectAnswer(questionIndex: number, answerIndex: number): boolean {
    const question = this.questionList[questionIndex];
    return (
      question &&
      answerIndex === question.answers.indexOf(question.correctAnswer)
    );
  }

  public closeModal() {
    this.dialogRef.close();
  }

  public submitAnswers() {
    this.submissionMade = true;

    this.answersSubmitted = true;
    const requestData = {
      question_description: this.currentQuestion.questionText,
      answers: this.currentQuestion.answers,
    };
    this.chatGptService
      .generateResponse(requestData)
      .subscribe((response: any) => {
        this.chatGptResponse = response.correct_answer;
        this.chatGptResponses.push(response.correct_answer);
      });
  }

  private initQuestions() {
    this.questionService
      .getAllQuestions(this.data.selectedCategory.name)
      .pipe(take(1))
      .subscribe((response: { answer1: any; answer2: any; answer3: any }[]) => {
        const transformedData = response.map((question: any) => {
          return {
            ...question,
            answers: [question.answer1, question.answer2, question.answer3],
          };
        });

        this.questionList = transformedData.filter(
          (question) => question.checkByAdmin
        );

        this.loadCurrentQuestion();
      });
  }

  private loadCurrentQuestion() {
    this.selectedAnswers[this.currentQuestionIndex] = [];
  }

  private calculateResults() {
    this.results = this.questionList.map((question, index) => {
      const selected = this.selectedAnswers[index];
      return (
        selected !== undefined &&
        selected.length === 1 &&
        question.answers[selected[0]] === question.correctAnswer
      );
    });
  }

  private saveTestHistory() {
    const testHistory: TestHistory = {
      testDate: new Date().toISOString(),
      chatGptCorrectAnswers: this.countChatGptCorrectAnswers(),
      userCorrectAnswers: this.countUserCorrectAnswers(),
      questionsAnswered: this.questionList.length,
      category: this.data.selectedCategory,
    };
    const id = this.authService.getUser().id;

    this.testsHistoryService.saveTestHistory(testHistory, id).subscribe(
      (response) => {
        console.log('Test history saved successfully', response);
      },
      (error) => {
        console.error('Error saving test history', error);
      }
    );
  }
}
