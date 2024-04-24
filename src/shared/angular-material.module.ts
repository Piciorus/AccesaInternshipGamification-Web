import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatIconModule } from '@angular/material/icon';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  ModalModule,
  TooltipModule,
  PopoverModule,
  ButtonsModule,
} from 'angular-bootstrap-md';
import { ModalService } from '@coreui/angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatMenuModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    ScrollingModule,
    MatIconModule,
    MdbRippleModule,
    MdbFormsModule,
    MatCheckboxModule,
  ],
  imports: [],
})
export class AngularMaterialModule {}
