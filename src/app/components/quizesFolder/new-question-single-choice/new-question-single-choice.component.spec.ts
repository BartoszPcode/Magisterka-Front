import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuestionSingleChoiceComponent } from './new-question-single-choice.component';

describe('NewQuestionSingleChoiceComponent', () => {
  let component: NewQuestionSingleChoiceComponent;
  let fixture: ComponentFixture<NewQuestionSingleChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewQuestionSingleChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQuestionSingleChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
