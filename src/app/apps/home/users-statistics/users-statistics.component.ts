import { Component, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ChartComponent,
} from 'ng-apexcharts';
import { take } from 'rxjs';
import { QuestionService } from 'src/app/libs/services/question.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors: string[];
};

@Component({
  selector: 'app-users-statistics',
  templateUrl: './users-statistics.component.html',
  styleUrls: ['./users-statistics.component.scss'],
})
export class UsersStatisticsComponent {
  @ViewChild('chart') chart: ChartComponent;
  public loading: boolean = true;
  public chartOptions: ChartOptions = {
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
    colors: ['#FAEBD7', '#FAEBD7', '#FAEBD7', '#FAEBD7', '#FAEBD7', '#FAEBD7'],
  };

  public categoryColorMap: { [key: string]: string } = {
    'Society & Culture': '#008FFB',
    'Science & Mathematics': '#FEB019',
    Health: '#775DD0',
    'Education & Reference': '#00FFFF',
    'Computers & Internet': '#B8860B',
    Sports: '#FF4560',
    'Business & Finance': '#006400',
    'Entertainment & Music': '#FF69B4',
    'Family & Relationships': '#00E396',
    'Politics & Government': '#FF1493',
  };

  constructor(private readonly questionService: QuestionService) {}

  ngOnInit() {
    this.initCorrectAnswersForEachCategory();
  }

  public initCorrectAnswersForEachCategory() {
    this.questionService
      .getCorrectAnswersForEachCategory()
      .pipe(take(1))
      .subscribe((response: any) => {
        this.chartOptions.labels = Object.keys(response);
        this.chartOptions.series = Object.values(response);
        this.chartOptions.colors = this.generateColors(Object.keys(response));
        this.loading = false;
      });
  }

  private generateColors(categories: string[]): string[] {
    let generatedColors: string[] = [];

    for (let category of categories) {
      if (this.categoryColorMap[category]) {
        generatedColors.push(this.categoryColorMap[category]);
      } else {
        generatedColors.push('#FAEBD7');
      }
    }

    return generatedColors;
  }
}
