import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ERole } from '../models/erole';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'http://localhost:8080/auth/';
  private isAuthenticated = false;
  private userSubject: BehaviorSubject<User>;
  private basePath = environment.apiUrl;

  currentUser$: Observable<string | null>;
  private currentUserSubject$ = new BehaviorSubject<string | null>(
    this.getLoggedInUsername()
  );
  public user: Observable<User>;

  private _firstLogin = false;

  constructor(private router: Router, private http: HttpClient) {
    this.currentUser$ = this.currentUserSubject$.asObservable();
    this.isAuthenticated = !!sessionStorage.getItem('token');
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(sessionStorage.getItem('currentUser') || '{}')
    );
    this.currentUser$ = this.currentUserSubject$.asObservable();

    this.user = this.userSubject.asObservable();
  }
  public register(
    username: string,
    password: string,
    email: string,
    role: ERole
  ): Observable<any> {
    return this.http.post<any>(this.basePath + '/auth/register', {
      username,
      password,
      email,
      role,
    });
  }
  public login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(this.basePath + '/auth/login', { username, password })
      .pipe(
        map((user: any) => {
          sessionStorage.setItem('token', JSON.stringify(user.jwttoken));
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.userSubject.next(user);
          this.isAuthenticated = true;
          return user;
        })
      );
  }
  public getMe(): Observable<User> {
    return this.http.get(
      this.basePath + '/users/getUserById/' + this.userSubject.getValue().id
    );
  }
  public setUser(user: User): void {
    this.userSubject.next(user);
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }
  get firstLogin() {
    return this._firstLogin;
  }

  set firstLogin(firstLogin: boolean) {
    this._firstLogin = firstLogin;
  }
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout() {
    sessionStorage.removeItem('token');
    this.setCurrentUser(null);
    this.router.navigate(['/auth/login']);
  }

  public getUser(): any {
    return this.userSubject.value;
  }

  public getAuthtoken(): any {
    return localStorage.getItem('token');
  }

  getLoggedInUsername(): string | null {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode<{ sub: string }>(token);
      if (decoded && 'sub' in decoded) {
        return decoded.sub;
      }
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject$.getValue() != null;
  }

  setCurrentUser(username: string | null): void {
    this.currentUserSubject$.next(username);
  }

  refreshToken(): Observable<any> {
    return this.http.get<any>(this.basePath + '/auth/refreshToken');
  }
}
