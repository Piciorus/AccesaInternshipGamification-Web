import { AfterViewInit, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ERole } from '../models/erole';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService implements OnInit {
  userRoles$: Observable<ERole[]>;

  private _userRolesSubject = new BehaviorSubject<ERole[]>([]);

  constructor() {
    this.getUserRoles();
  }

  ngOnInit() {
    this.getUserRoles();
  }

  getUserRoles(): ERole[] {
    const token = localStorage.getItem('currentUser');
    if (token) {
      const currentUser = JSON.parse(token);
      if (currentUser.roles) {
        const userRoles: ERole[] = currentUser.roles;
        this._userRolesSubject.next(userRoles);
        return userRoles;
      }
    }
    return [];
  }

  hasRoles(targetRoles: ERole[]): Promise<boolean> {
    const userRoles: ERole[] = this._userRolesSubject.getValue();
    return Promise.resolve(
      targetRoles.some((role) => userRoles.includes(role))
    );
  }
}
