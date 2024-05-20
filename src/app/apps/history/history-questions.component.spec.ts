import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryQuestionsComponent } from './history-questions.component';

describe('HistoryQuestionsComponent', () => {
  let component: HistoryQuestionsComponent;
  let fixture: ComponentFixture<HistoryQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryQuestionsComponent]
    });
    fixture = TestBed.createComponent(HistoryQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
