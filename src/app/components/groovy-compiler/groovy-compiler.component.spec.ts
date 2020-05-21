import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroovyCompilerComponent } from './groovy-compiler.component';

describe('GroovyCompilerComponent', () => {
  let component: GroovyCompilerComponent;
  let fixture: ComponentFixture<GroovyCompilerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroovyCompilerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroovyCompilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
