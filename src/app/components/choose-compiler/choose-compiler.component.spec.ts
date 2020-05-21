import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCompilerComponent } from './choose-compiler.component';

describe('ChooseCompilerComponent', () => {
  let component: ChooseCompilerComponent;
  let fixture: ComponentFixture<ChooseCompilerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseCompilerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCompilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
