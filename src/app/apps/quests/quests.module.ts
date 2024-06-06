import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { AngularMaterialModule } from 'src/shared/angular-material.module';
import { InfoQuestionComponent } from './info-question/info-question.component';
import { QuestsRoutingModule } from './quests-routing.module';
import { QuestsComponent } from './quests.component';

@NgModule({
  declarations: [QuestsComponent, InfoQuestionComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    QuestsRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    MatDialogModule,
  ],
})
export class QuestsModule {}
