import { NgModule } from '@angular/core';
import { QuestsComponent } from './quests.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: QuestsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestsRoutingModule {}
