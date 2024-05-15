import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Quest } from '../models/quest';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private basePath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getAllQuestions(
    category?: string,
    difficulty?: string
  ): Observable<any> {
    let params = new HttpParams();
    if (category) {
      params = params.append('category', category);
    }
    if (difficulty) {
      params = params.append('difficulty', difficulty);
    }
    if (category == '') {
      params = params.delete('category');
    }

    if (difficulty == '') {
      params = params.delete('difficulty');
    }

    console.log(category);
    return this.http.get(this.basePath + '/test/question', { params: params });
  }

  public createQuestion(question: Question): Observable<any> {
    return this.http.post(this.basePath + '/test/createQuestion', question, {
      responseType: 'text',
    });
  }

  public updateQuestion(idQuest: number, question: Question): Observable<any> {
    return this.http.put(
      this.basePath + '/test/updateQuestion/' + idQuest,
      question
    );
  }

  public resolveQuestion(idQuest: number, idUser: number): Observable<any> {
    return this.http.post(
      this.basePath + '/test/resolveQuestion/' + idQuest + '/' + idUser,
      {}
    );
  }
}
