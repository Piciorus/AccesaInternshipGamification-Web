import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayTestComponent } from './play-test.component';

describe('PlayTestComponent', () => {
  let component: PlayTestComponent;
  let fixture: ComponentFixture<PlayTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
