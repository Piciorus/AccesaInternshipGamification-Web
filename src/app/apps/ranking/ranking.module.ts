import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingComponent } from './ranking.component';
import { FormsModule } from '@angular/forms';
import { RankingRoutingModule } from './ranking-routing.module';
import { MatTableModule } from '@angular/material/table';
import { AngularMaterialModule } from 'src/shared/angular-material.module';


@NgModule({
  declarations: [RankingComponent],
  imports: [CommonModule, FormsModule, RankingRoutingModule,AngularMaterialModule],
})
export class RankingModule {}
