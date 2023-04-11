import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestsComponent } from './quests.component';



const routes: Routes = [
  { path: '', component: QuestsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestsRoutingModule { }
