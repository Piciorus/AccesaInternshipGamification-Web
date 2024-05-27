import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestsComponent } from './quests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/shared/angular-material.module';
import { QuestsRoutingModule } from './quests-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { InfoQuestionComponent } from './info-question/info-question.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

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
