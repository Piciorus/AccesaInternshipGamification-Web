import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './libs/auth/auth.service';
import { AuthorizationService } from './libs/auth/authorization.service';
import { AuthInterceptorService } from './libs/interceptor/TokenBasedInterceptor';
import { ERole } from './libs/models/erole';
import { ConfirmActionModalComponent } from './libs/utils/confirm-action-modal/confirm-action-modal.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { DeactivateGuard } from './libs/auth/deactivate-guard.service';
import { TranslateService } from '@ngx-translate/core';

function initializeAppFactory(
  authorizationService: AuthorizationService,
  authenticationService: AuthService
): () => ERole[] {
  return () => {
    return authenticationService.isLoggedIn()
      ? authorizationService.getUserRoles()
      : [];
  };
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
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
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    NgxWebstorageModule.forRoot({
      prefix: 'app',
      separator: '.',
      caseSensitive: true,
    }),
  ],
  providers: [
    DeactivateGuard,
    TranslateService,
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
