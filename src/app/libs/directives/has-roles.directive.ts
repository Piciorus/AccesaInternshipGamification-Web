import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthorizationService } from '../auth/authorization.service';
import { ERole } from '../models/erole';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[appHasPermission]',
  standalone: true,
})
export class HasRolesDirective  {
  @Input() set appHasPermission(roles: ERole[]) {
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
