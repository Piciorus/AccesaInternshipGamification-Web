import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingComponent } from './ranking.component';
import { FormsModule } from '@angular/forms';
import { RankingRoutingModule } from './ranking-routing.module';
import { AngularMaterialModule } from 'src/shared/angular-material.module';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { TableModule } from 'ngx-easy-table';
import { GuiGridModule } from '@generic-ui/ngx-grid';

@NgModule({
  declarations: [RankingComponent, UserAvatarComponent],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    RankingRoutingModule,
    AngularMaterialModule,
    GuiGridModule
  ],
})
export class RankingModule {}
