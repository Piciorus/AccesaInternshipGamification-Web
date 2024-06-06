import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/libs/auth/auth-guard.service';
import { UsersComponent } from './users.component';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: UsersComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
