import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmActionModalService } from 'src/app/libs/services/confirmation-action-modal.sevice';
import { AngularMaterialModule } from 'src/shared/angular-material.module';
import { PlayTestComponent } from '../play-test/play-test.component';
import { CreateQuestionModalComponent } from './create-question-modal/create-question-modal.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { QuestlistComponent } from './questlist/questlist.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { UsersStatisticsComponent } from './users-statistics/users-statistics.component';

@NgModule({
  declarations: [
    HomeComponent,
    QuestlistComponent,
    StatisticsComponent,
    PlayTestComponent,
    CreateQuestionModalComponent,
    UsersStatisticsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    HomeRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatDialogModule,
    MatTooltipModule,
    MatSelectModule,
    NgApexchartsModule,
    ToastrModule.forRoot(),
    NgCircleProgressModule.forRoot({}),
  ],
  providers: [ConfirmActionModalService],
})
export class HomeModule {}
