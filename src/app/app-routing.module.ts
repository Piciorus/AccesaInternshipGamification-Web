import { NgModule } from '@angular/core';
import { HomeComponent } from './apps/home/home.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/authmodule.module').then((m) => m.AuthModule),
  },
  {
    path: 'app',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
