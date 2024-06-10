import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { CoreRoutingModule } from './core-routing.module';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/shared/angular-material.module';
import { HasRolesDirective } from '../libs/directives/has-roles.directive';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChatComponent } from '../apps/chat/chat.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ReactiveFormsModule } from '@angular/forms';
import { CollapsibleChatComponent } from '../apps/chat/collapsible-chat/collapsible-chat.component';
@NgModule({
  declarations: [LayoutComponent, ChatComponent,CollapsibleChatComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    AngularMaterialModule,
    HasRolesDirective,
    NavbarModule,
    WavesModule,
    MenuModule,
    ReactiveFormsModule,
    MatIconModule,
    ButtonsModule,
    MatInputModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatCardModule,
    ClipboardModule,
    FlexLayoutModule,
    MdbCheckboxModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    TranslateModule,
  ],
})
export class CoreModule {}
