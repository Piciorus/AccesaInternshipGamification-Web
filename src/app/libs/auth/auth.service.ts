import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private basePath = environment.apiUrl;
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.user = this.userSubject.asObservable();
  }

  public login(username: string, password: string) {
    return this.http
      .post<any>(this.basePath + '/auth/login', { username, password })
      .pipe(
        map((user: any) => {
          console.log(user)
          localStorage.setItem('token', JSON.stringify(user.jwttoken));
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  public register(username: string, password: string, email: string):Observable<any> {
    return this.http.post<any>(this.basePath + '/auth/register', {
      username,
      password,
      email,
    });
  }

  public logout():void{
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('tokens');
    this.router.navigateByUrl('/auth/login');
  }

  public getMe(): Observable<User> {
    return this.http.get(
      this.basePath + '/users/getUserById/' + this.userSubject.getValue().id
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
    return JSON.parse(localStorage.getItem('token') || '{}');
  }
}
