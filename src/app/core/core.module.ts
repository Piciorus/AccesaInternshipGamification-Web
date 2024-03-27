import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { CoreRoutingModule } from './core-routing.module';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/shared/angular-material.module';
import { HasRolesDirective } from '../libs/directives/has-roles.directive';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    AngularMaterialModule,
    HasRolesDirective,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    MdbCheckboxModule
  ],
})
export class CoreModule {}
