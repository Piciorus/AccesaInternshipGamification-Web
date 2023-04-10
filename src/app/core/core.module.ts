import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { CoreRoutingModule } from './core-routing.module';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/shared/angular-material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../libs/Interceptors/TokenBasedInterceptor';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    AngularMaterialModule,
  ],
})
export class CoreModule {}
