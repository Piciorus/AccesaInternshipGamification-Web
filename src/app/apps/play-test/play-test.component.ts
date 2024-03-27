// play-test.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { ChatGptService } from 'src/app/libs/services/chatgpt.service';
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
  public answersSubmitted: boolean = false;
  public chatGptResponse: string = '';
  public chatGptResponses: string[] = [];
  public submissionMade: boolean = false;

  constructor(
    private readonly questionService: QuestionService,
    private readonly chatGptService: ChatGptService,
    private dialogRef: MatDialogRef<PlayTestComponent>
  ) {}

  public ngOnInit(): void {
    this.initQuestions();
  }

  initQuestions() {
    this.questionService
      .getAllQuestions()
      .pipe(take(1))
      .subscribe((response: { answer1: any; answer2: any; answer3: any }[]) => {
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
    this.answersSubmitted = false;
    if (this.currentQuestionIndex < this.questionList.length) {
      this.loadCurrentQuestion();
    } else {
      this.calculateResults();
      this.showResults = true;
    }
  }
  isMatchingResponse(answer: string): boolean {
    return this.submissionMade && answer === this.chatGptResponse;
  }
  
  // Add a method to check if each answer does not match the ChatGPT response
  isNotMatchingResponse(answer: string): boolean {
    return this.submissionMade && answer !== this.chatGptResponse;
  }
  
  submitAnswers() {
    this.submissionMade = true;

    this.answersSubmitted = true;
    const requestData = {
      question_description: this.currentQuestion.questionText,
      answers: this.currentQuestion.answers,
    };
    this.chatGptService
      .generateResponse(requestData)
      .subscribe((response: any) => {
        console.log('Response from ChatGPT:', response.correct_answer);
        this.chatGptResponse = response.correct_answer;
        this.chatGptResponses.push(response.correct_answer);
      });
  }

  isSelected(answerIndex: number) {
    return this.selectedAnswers[this.currentQuestionIndex]?.includes(
      answerIndex
    );
  }
  isCorrectAnswer(questionIndex: number, answerIndex: number): boolean {
    const question = this.questionList[questionIndex];
    return question && answerIndex === question.answers.indexOf(question.correctAnswer);
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
