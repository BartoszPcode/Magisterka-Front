import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseAnswersTeacherWindowComponent } from './exercise-answers-teacher-window.component';

describe('ExerciseAnswersTeacherWindowComponent', () => {
  let component: ExerciseAnswersTeacherWindowComponent;
  let fixture: ComponentFixture<ExerciseAnswersTeacherWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseAnswersTeacherWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseAnswersTeacherWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
