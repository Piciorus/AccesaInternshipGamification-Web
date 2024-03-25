import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Quest } from '../models/quest';

@Injectable({
  providedIn: 'root',
})
export class QuestService {
  private basePath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getQuests(): Observable<any> {
    return this.http.get(this.basePath + '/quest/getAllQuests');
  }

  public getAllResolvedQuests(idUser: number): Observable<any> {
    return this.http.get(
      this.basePath + '/quest/getAllResolvedQuests/' + idUser
    );
  }

  public createQuest(quest: Quest, idUser: number): Observable<any> {
    return this.http.post(
      this.basePath + '/quest/createQuest/' + idUser,
      quest,
      { responseType: 'text' }
    );
  }

  public resolveQuest(idQuest: number, idUser: number): Observable<any> {
    return this.http.post(
      this.basePath + '/quest/resolveQuest/' + idQuest + '/' + idUser,
      {}
    );
  }

  public updateRewarded(idQuest: number, rewarded: boolean): Observable<any> {
    return this.http.put(
      this.basePath + '/quest/updateRewarded/' + idQuest,
      rewarded
    );
  }

  public checkAnswer(
    userId: number,
    answer: string,
    questId: number
  ): Observable<boolean> {
    return this.http.post<boolean>(this.basePath + '/quest/checkAnswer', {
      answer,
      questId,
      userId,
    });
  }
}
