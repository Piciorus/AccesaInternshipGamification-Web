import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private basePath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getAllUsers() {
    return this.http.get<any>(this.basePath + '/getAllUsers');
  }

  public getUsersSortedByTokensAscending() {
    return this.http.get<any>(
      this.basePath + '/getAllUsers?sort=asc'
    );
  }

  public getUsersSortedByTokensDescending() {
    return this.http.get<any>(
      this.basePath + '/getAllUsers?sort=desc'
    );
  }

  public updateTokens(userId: number, tokens: number) {
    return this.http.put<any>(this.basePath + '/updateTokens/' + userId, {
      tokens,
    });
  }

  public rewardBadge(idBadge: number, idUser: number) {
    return this.http.post<any>(
      this.basePath + '/rewardBadge/' + idBadge + '/' + idUser,
      {}
    );
  }

  public updateThreshold(idUser:number,threshold:number){
    return this.http.put<any>(this.basePath + '/updateThreshold/' + idUser, {
      threshold,
    });
  }
}
