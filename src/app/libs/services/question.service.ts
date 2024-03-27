import { HttpBackend, HttpClient } from '@angular/common/http';
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

  public getAllQuestions(): Observable<any> {
    return this.http.get(this.basePath + '/test/question');
  }

  public createQuestion(question: Question): Observable<any> {
    return this.http.post(
      this.basePath + '/test/createQuestion' ,
      question,
      { responseType: 'text' }
    );
  }

  public updateQuestion(idQuest: number, question: Question): Observable<any> {
    return this.http.put(
      this.basePath + '/test/updateQuestion/' + idQuest,
      question
    );
  }
}
