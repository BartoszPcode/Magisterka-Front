import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesUserTabviewComponent } from './exercises-user-tabview.component';

describe('ExercisesUserTabviewComponent', () => {
  let component: ExercisesUserTabviewComponent;
  let fixture: ComponentFixture<ExercisesUserTabviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercisesUserTabviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesUserTabviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
