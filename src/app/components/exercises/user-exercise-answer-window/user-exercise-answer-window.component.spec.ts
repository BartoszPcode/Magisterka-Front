import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExerciseAnswerWindowComponent } from './user-exercise-answer-window.component';

describe('UserExerciseAnswerWindowComponent', () => {
  let component: UserExerciseAnswerWindowComponent;
  let fixture: ComponentFixture<UserExerciseAnswerWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserExerciseAnswerWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserExerciseAnswerWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
