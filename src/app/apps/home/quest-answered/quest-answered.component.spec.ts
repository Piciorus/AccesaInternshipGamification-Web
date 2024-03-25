import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestAnsweredComponent } from './quest-answered.component';

describe('QuestAnsweredComponent', () => {
  let component: QuestAnsweredComponent;
  let fixture: ComponentFixture<QuestAnsweredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestAnsweredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestAnsweredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
