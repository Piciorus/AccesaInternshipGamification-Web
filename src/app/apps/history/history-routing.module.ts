import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/libs/auth/auth-guard.service';
import { HistoryQuestionsComponent } from './history-questions.component';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: HistoryQuestionsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryRoutingModule {}
