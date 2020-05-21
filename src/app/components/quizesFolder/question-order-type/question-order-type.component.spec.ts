import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionOrderTypeComponent } from './question-order-type.component';

describe('QuestionOrderTypeComponent', () => {
  let component: QuestionOrderTypeComponent;
  let fixture: ComponentFixture<QuestionOrderTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionOrderTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionOrderTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
