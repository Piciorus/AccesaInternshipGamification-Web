import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestService {
  private basePath = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  public getQuests(): Observable<any> {
    return this.http.get(this.basePath + '/getAllQuests');
  }

  public createQuest(
    answer: string,
    description: string,
    questRewardTokens: number,
    difficulty: string,
    threshold: number
  ): Observable<any> {
    return this.http.post(this.basePath + '/createQuest', {
      answer,
      description,
      questRewardTokens,
      difficulty,
      threshold
    });
  }

  public resolveQuest(idQuest: number, idUser: number): Observable<any> {
    return this.http.post(
      this.basePath + '/resolveQuest/' + idQuest + "/" + idUser,
      {}
    );
  }

  public updateRewarded(idQuest:number,rewarded:boolean):Observable<any>{
    return this.http.put(this.basePath + '/updateRewarded/' + idQuest, rewarded);
  }
}
