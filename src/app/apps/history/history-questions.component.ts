import { Component, ViewChild } from '@angular/core';
import Chart, { ChartComponent, registerables } from 'chart.js';
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
  public questionsAnsweredLast7Days = 4;
  public incorrectAnswers = 0;
  public totalQuestionsAnswered = 4;
  public correctAnswers = 4;
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

  initUserQuestionHistory() {
    const id = this.authService.getUser().id;

    this.questionService
      .getUserQuestionHistory(id)
      .pipe(take(1))
      .subscribe((response: any[]) => {
        this.userQuestionsHistory = response;
      });
  }

  initTestsHistoryService() {
    const id = this.authService.getUser().id;

    this.testsHistoryService
      .findAllTestsHistoryByUserId(id)
      .pipe(take(1))
      .subscribe((response: any[]) => {
        this.testsHistory = response;
      });
  }

  statistics: any[];
  @ViewChild('chart') chart: ChartComponent;
  chartOptions: any = {
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

  public initQuestions() {
    const id = this.authService.getUser().id;

    this.questionService.getUserStatistics(id).subscribe((response: any) => {
      this.chartOptions.labels = Object.keys(response);
      this.chartOptions.series = Object.values(response);
    });
  }
  public onDataChangeDetected() {
    this.initQuestions();
  }
}
