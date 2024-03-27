import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatGptRequest } from '../models/chatgpt';

@Injectable({
  providedIn: 'root',
})
export class ChatGptService {
  url: string = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  generateResponse(request: ChatGptRequest): Observable<any> {
    return this.http.post<any>(this.url + '/get_correct_answer', request);
  }
}