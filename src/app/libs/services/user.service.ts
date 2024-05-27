import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private basePath = environment.apiUrl;

  public constructor(private readonly http: HttpClient) {}

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.basePath + '/users/getAllUsers');
  }

  public getUsersSortedByTokensAscending(): Observable<User[]> {
    return this.http.get<User[]>(this.basePath + '/users/getAllUsers?sort=asc');
  }

  public getUsersSortedByTokensDescending(): Observable<User[]> {
    return this.http.get<User[]>(
      this.basePath + '/users/getAllUsers?sort=desc'
    );
  }

  public updateTokens(userId: number, tokens: number): Observable<User> {
    return this.http.put<User>(
      this.basePath + '/users/updateTokens/' + userId,
      {
        tokens,
      }
    );
  }

  public rewardBadge(idBadge: number, idUser: number): Observable<void> {
    return this.http.post<void>(
      this.basePath + '/rewardBadge/' + idBadge + '/' + idUser,
      {}
    );
  }

  public updateThreshold(idUser: number, threshold: number): Observable<void> {
    return this.http.put<void>(this.basePath + '/updateThreshold/' + idUser, {
      threshold,
    });
  }
}
