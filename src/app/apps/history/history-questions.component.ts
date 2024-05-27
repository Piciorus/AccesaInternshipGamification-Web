import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'chart.js';
import { take } from 'rxjs';
import { AuthService } from 'src/app/libs/auth/auth.service';
import { QuestionService } from 'src/app/libs/services/question.service';
import { TestsHistoryService } from 'src/app/libs/services/tests-history.service';

@Component({
  selector: 'app-history-questions',
  templateUrl: './history-questions.component.html',
  styleUrls: ['./history-questions.component.scss'],
})
export class HistoryQuestionsComponent {
  public userQuestionsHistory: any[];
  public testsHistory: any[];
  public statistics: any[];
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: any = {
    series: [0],
    chart: {
      height: 800,
      type: 'donut',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
        },
      },
    ],
    labels: ['Loading...'],
  };

  constructor(
    private readonly questionService: QuestionService,
    private readonly testsHistoryService: TestsHistoryService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initTestsHistoryService();
    this.initUserQuestionHistory();
    this.initQuestions();
  }

  private initUserQuestionHistory() {
    const id = this.authService.getUser().id;
    this.questionService
      .getUserQuestionHistory(id)
      .pipe(take(1))
      .subscribe((response: any[]) => {
        this.userQuestionsHistory = response;
      });
  }

  private initTestsHistoryService() {
    const id = this.authService.getUser().id;
    this.testsHistoryService
      .findAllTestsHistoryByUserId(id)
      .pipe(take(1))
      .subscribe((response: any[]) => {
        this.testsHistory = response;
      });
  }

  private initQuestions() {
    const id = this.authService.getUser().id;

    this.questionService.getUserStatistics(id).subscribe((response: any) => {
      this.chartOptions.labels = Object.keys(response).map((key) => {
        switch (key) {
          case 'questionsAnsweredLast7Days':
            return 'Number of questions answered last 7 days';
          case 'incorrectAnswers':
            return 'Number of incorrect answers';
          case 'totalQuestionsAnswered':
            return 'Number of total questions answered';
          case 'correctAnswers':
            return 'Number of total correct answers';
          default:
            return key;
        }
      });
      this.chartOptions.series = Object.values(response);
    });
  }
}
