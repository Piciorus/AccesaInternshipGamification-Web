import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  exports: [MatButtonModule, MatToolbarModule, MatTableModule, MatMenuModule],
})
export class AngularMaterialModule {}
