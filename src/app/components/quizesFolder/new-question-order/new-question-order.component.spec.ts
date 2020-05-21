import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuestionOrderComponent } from './new-question-order.component';

describe('NewQuestionOrderComponent', () => {
  let component: NewQuestionOrderComponent;
  let fixture: ComponentFixture<NewQuestionOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewQuestionOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQuestionOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
