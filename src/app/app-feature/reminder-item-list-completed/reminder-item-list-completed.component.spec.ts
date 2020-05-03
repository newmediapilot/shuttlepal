import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderItemListCompletedComponent } from './reminder-item-list-completed.component';

describe('ReminderItemListCompletedComponent', () => {
  let component: ReminderItemListCompletedComponent;
  let fixture: ComponentFixture<ReminderItemListCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderItemListCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderItemListCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
