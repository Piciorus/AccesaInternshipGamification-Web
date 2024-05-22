import { NgModule } from '@angular/core';
import { RankingComponent } from './ranking.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/libs/auth/auth-guard.service';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: RankingComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RankingRoutingModule {}
