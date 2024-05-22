import { NgModule } from '@angular/core';
import { QuestsComponent } from './quests.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/libs/auth/auth-guard.service';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: QuestsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestsRoutingModule {}
