import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestsComponent } from './quests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from '../home/home-routing.module';
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
  ],
})
export class QuestsModule {}
