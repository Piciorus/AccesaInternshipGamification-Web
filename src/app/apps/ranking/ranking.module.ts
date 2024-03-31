import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingComponent } from './ranking.component';
import { FormsModule } from '@angular/forms';
import { RankingRoutingModule } from './ranking-routing.module';
import { AngularMaterialModule } from 'src/shared/angular-material.module';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';

@NgModule({
  declarations: [RankingComponent, UserAvatarComponent],
  imports: [
    CommonModule,
    FormsModule,
    RankingRoutingModule,
    AngularMaterialModule,
  ],
})
export class RankingModule {}
