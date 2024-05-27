import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryQuestionsComponent } from './history-questions.component';
import { HistoryRoutingModule } from './history-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [HistoryQuestionsComponent],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    MatCardModule,
    MatButtonModule,
    NgApexchartsModule,
    TranslateModule,
  ],
})
export class HistoryModule {}
