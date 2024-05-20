import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryQuestionsComponent } from './history-questions.component';

const routes: Routes = [
  { path: '', component: HistoryQuestionsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryRoutingModule {}
