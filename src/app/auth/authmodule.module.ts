import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { HomeComponent } from '../apps/home/home.component';


@NgModule({
  declarations: [LoginComponent,RegisterComponent],
  imports: [CommonModule, 
    ReactiveFormsModule,
    FormsModule, 
    RouterModule, 
    AuthRoutingModule],
})
export class AuthModule { }
