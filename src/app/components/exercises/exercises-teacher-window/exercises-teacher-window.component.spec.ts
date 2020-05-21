import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesTeacherWindowComponent } from './exercises-teacher-window.component';

describe('ExercisesTeacherWindowComponent', () => {
  let component: ExercisesTeacherWindowComponent;
  let fixture: ComponentFixture<ExercisesTeacherWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercisesTeacherWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesTeacherWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
