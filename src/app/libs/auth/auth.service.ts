import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private basePath = environment.apiUrl;
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.isAuthenticated = !!localStorage.getItem('token');
    this.user = this.userSubject.asObservable();
  }

  public login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(this.basePath + '/auth/login', { username, password })
      .pipe(
        map((user: any) => {
          localStorage.setItem('token', JSON.stringify(user.jwttoken));
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.userSubject.next(user);
          this.isAuthenticated = true;
          return user;
        })
      );
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  isLoggedIn(): boolean {
    return this.userSubject.getValue() != null;
  }

  public register(
    username: string,
    password: string,
    email: string
  ): Observable<any> {
    return this.http.post<any>(this.basePath + '/auth/register', {
      username,
      password,
      email,
    });
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('tokens');
    localStorage.removeItem('refreshToken');
    this.router.navigateByUrl('/auth/login');
  }

  public getMe(): Observable<User> {
    return this.http.get(
      this.basePath + '/users/getUserById/' + this.userSubject.getValue().id
    );
  }

  refreshAccessToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http
      .post<any>(`${this.basePath}/auth/refreshtoken`, { refreshToken })
      .pipe(
        tap((response: { accessToken: string }) => {
          localStorage.setItem('accessToken', response.accessToken);
        }),
        catchError((error) => {
          console.error('Error refreshing access token:', error);
          return throwError(error);
        })
      );
  }
  
  public setUser(user: User): void {
    this.userSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  public getUser(): any {
    return this.userSubject.value;
  }

  public getAuthtoken(): any {
    return localStorage.getItem('token');
  }
}
