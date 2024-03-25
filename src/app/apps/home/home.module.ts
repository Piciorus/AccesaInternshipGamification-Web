import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { AngularMaterialModule } from 'src/shared/angular-material.module';
import { QuestlistComponent } from './questlist/questlist.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { QuestAnsweredComponent } from './quest-answered/quest-answered.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PlayTestComponent } from '../play-test/play-test.component';
import { CreateQuestionModalComponent } from './create-question-modal/create-question-modal.component';

@NgModule({
  declarations: [
    HomeComponent,
    QuestlistComponent,
    StatisticsComponent,
    QuestAnsweredComponent,
    PlayTestComponent,
    CreateQuestionModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
})
export class HomeModule {}
