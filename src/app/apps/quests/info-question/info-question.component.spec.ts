import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoQuestionComponent } from './info-question.component';

describe('InfoQuestionComponent', () => {
  let component: InfoQuestionComponent;
  let fixture: ComponentFixture<InfoQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoQuestionComponent]
    });
    fixture = TestBed.createComponent(InfoQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
