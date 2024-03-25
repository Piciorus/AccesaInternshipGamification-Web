import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Quest } from '../models/quest';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private basePath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getAllQuestions(): Observable<any> {
    return this.http.get(this.basePath + '/test/question');
  }
}
