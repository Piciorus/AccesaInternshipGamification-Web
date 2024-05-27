import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Question, UserAnswerRequest } from '../models/question';

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

    return this.http.get(this.basePath + '/test/question', { params: params });
  }
  private questionCreatedSource = new Subject<void>();

  questionCreated$ = this.questionCreatedSource.asObservable();

  public createQuestion(question: Question): Observable<any> {
    return this.http.post(this.basePath + '/test/createQuestion', question, {
      responseType: 'text',
    });
  }

  public updateQuestion(idQuest: string, question: Question): Observable<any> {
    return this.http.put<any>(
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

  public markResolvedQuestion(
    idUser: number,
    idQuest: number,
    userAnswer: UserAnswerRequest
  ): Observable<any> {
    return this.http.post(
      this.basePath + '/test/markCorrect/' + idUser + '/' + idQuest,
      userAnswer
    );
  }

  public getUnansweredQuestionsForUser(
    idUser: number,
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

    return this.http.get(
      this.basePath + '/test/unansweredQuestions/' + idUser,
      { params: params }
    );
  }

  public getCorrectAnswersForEachCategory(): Observable<any> {
    return this.http.get(
      this.basePath + '/test/correctAnswersForEachCategory',
      {}
    );
  }

  public getUserQuestionHistory(userId: string): Observable<any> {
    return this.http.get(
      this.basePath + '/test/userQuestionHistory/' + userId,
      {}
    );
  }

  public getUserStatistics(userId: string): Observable<any> {
    return this.http.get(this.basePath + '/test/userStatistics/' + userId, {});
  }

  public deleteQuestion(questionId: string): Observable<any> {
    return this.http.delete(
      this.basePath + '/test/deleteQuestion/' + questionId,
      {}
    );
  }
}
