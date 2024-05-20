import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './apps/home/home.component';
import { RankingComponent } from './apps/ranking/ranking.component';
import { LayoutComponent } from './core/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestsComponent } from './apps/quests/quests.component';
import { PlayTestComponent } from './apps/play-test/play-test.component';
import { HasRolesDirective } from './libs/directives/has-roles.directive';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AuthorizationService } from './libs/auth/authorization.service';
import { AuthService } from './libs/auth/auth.service';
import { ERole } from './libs/models/erole';
import { AuthInterceptorService } from './libs/interceptor/TokenBasedInterceptor';
import { ConfirmActionModalComponent } from './libs/utils/confirm-action-modal/confirm-action-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

function initializeAppFactory(
  authorizationService: AuthorizationService,
  authenticationService: AuthService
): () => ERole[] {
  return () => {
    return authenticationService.isLoggedIn()
      ? authorizationService.getUserRoles()
      : []
  };
}
@NgModule({
  declarations: [AppComponent, ConfirmActionModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [AuthorizationService, AuthService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
