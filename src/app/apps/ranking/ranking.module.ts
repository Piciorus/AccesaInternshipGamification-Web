import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GuiGridModule } from '@generic-ui/ngx-grid';
import { TableModule } from 'ngx-easy-table';
import { AngularMaterialModule } from 'src/shared/angular-material.module';
import { RankingRoutingModule } from './ranking-routing.module';
import { RankingComponent } from './ranking.component';
import { HasRolesDirective } from 'src/app/libs/directives/has-roles.directive';

@NgModule({
  declarations: [RankingComponent],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    RankingRoutingModule,
    AngularMaterialModule,
    GuiGridModule,
    HasRolesDirective,
  ],
})
export class RankingModule {}
