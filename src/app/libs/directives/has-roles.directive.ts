import {
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ERole } from '../models/erole';
import { AuthorizationService } from '../auth/authorization.service';

@Directive({
  selector: '[appHasRoles]'
})
export class HasRolesDirective implements OnDestroy {
  @Input() set hasRoles(roles: ERole[]) {
    this.updateView(roles);
  }
  private isHidden = false;

  private _directiveDestroy$ = new Subject<void>();

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private authorizationService: AuthorizationService
  ) {}

  ngOnDestroy(): void {
    this._directiveDestroy$.next();
    this._directiveDestroy$.complete();
  }

  private updateView(roles: ERole[]) {
    this.authorizationService.userRoles$
      .pipe(takeUntil(this._directiveDestroy$))
      .subscribe(() => {
        this.authorizationService.hasRoles(roles).then((result: boolean) => {
          if (result && !this.isHidden) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.isHidden = true;
          } else if (!result && this.isHidden) {
            this.viewContainer.clear();
            this.isHidden = false;
          }
        });
      });
  }
}
