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

@Directive({
  selector: '[appHasPermission]',
  standalone:true
})
export class HasRolesDirective implements OnInit {
  readonly USER_ROLES = ERole;
  currentUserRoles!: any[] | null;
  permissions: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authorizationService: AuthorizationService,
    private ref: ChangeDetectorRef
  ) {

  }

  @Input() set appHasPermission(condition: string[]) {
    this.permissions = condition;
    if (this.permissions && this.currentUserRoles) {
      this.updateView();
    }
  }

  ngOnInit() {
    this.currentUserRoles = this.authorizationService.getUserRoles();
    if (this.permissions && this.currentUserRoles) {

      this.updateView();
    }

    this.ref.markForCheck();
  }

  private updateView() {
    if (this.viewContainer.length === 0 && this.hasUserRole()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private hasUserRole() {
    return this.currentUserRoles?.some(
      (role) =>
        this.permissions.includes(role.name) ||
        this.permissions.every(
          (permission) => permission === this.USER_ROLES.User
        )
    );
  }
}
