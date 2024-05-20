import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TestHistory } from '../models/test-history';

@Injectable({
  providedIn: 'root',
})
export class TestsHistoryService {
  private basePath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public saveTestHistory(
    testHistory: TestHistory,
    userId: string
  ): Observable<any> {
    return this.http.post(
      this.basePath + '/history/saveHistoryTest/' + userId,
      testHistory,
      {
        responseType: 'text',
      }
    );
  }

  public findAllTestsHistoryByUserId(userId: string): Observable<any> {
    return this.http.get(
      this.basePath + '/history/getHistoryTest/' + userId,
      {}
    );
  }
}
