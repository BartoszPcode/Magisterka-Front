import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsToCourseComponent } from './groups-to-course.component';

describe('GroupsToCourseComponent', () => {
  let component: GroupsToCourseComponent;
  let fixture: ComponentFixture<GroupsToCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsToCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsToCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
