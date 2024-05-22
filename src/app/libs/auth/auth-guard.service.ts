import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard
  implements CanActivate, CanActivateChild, CanDeactivate<any>, CanLoad
{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    return this.checkAuth();
  }

  canActivateChild(): boolean {
    return this.checkAuth();
  }

  canDeactivate(component: any): boolean {
    if (component.hasUnsavedChanges()) {
      return window.confirm(
        'You have unsaved changes. Do you really want to leave?'
      );
    }
    return true;
  }

  canLoad(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    if (this.authService.isAuthenticatedUser()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
