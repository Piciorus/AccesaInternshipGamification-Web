import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestsComponent } from './quests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/shared/angular-material.module';
import { QuestsRoutingModule } from './quests-routing.module';

@NgModule({
  declarations: [QuestsComponent],
  imports: [
    CommonModule,
    FormsModule,
    QuestsRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class QuestsModule {}
