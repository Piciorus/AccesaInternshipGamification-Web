import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { AngularMaterialModule } from 'src/shared/angular-material.module';


@NgModule({
  declarations: [LoginComponent,RegisterComponent],
  imports: [CommonModule, 
    ReactiveFormsModule,
    FormsModule, 
    RouterModule, 
    AuthRoutingModule,
    AngularMaterialModule
    
  ],
})
export class AuthModule { }
