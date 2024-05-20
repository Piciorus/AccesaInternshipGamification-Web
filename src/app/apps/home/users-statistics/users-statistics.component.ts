import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ChartComponent,
} from 'ng-apexcharts';
import { QuestionService } from 'src/app/libs/services/question.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-users-statistics',
  templateUrl: './users-statistics.component.html',
  styleUrls: ['./users-statistics.component.scss'],
})
export class UsersStatisticsComponent {
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
  loading: boolean = true;

  constructor(
    private readonly questionService: QuestionService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initQuestions();
  }

  public initQuestions() {
    this.questionService
      .getCorrectAnswersForEachCategory()
      .subscribe((response: any) => {
        this.chartOptions.labels = Object.keys(response);
        this.chartOptions.series = Object.values(response);
        this.loading = false;
        this.cdr.detectChanges();
      });
  }
  
  public onDataChangeDetected() {
    this.initQuestions();
  }
}
