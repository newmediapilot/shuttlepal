import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderItemListDeletedComponent } from './reminder-item-list-deleted.component';

describe('ReminderItemListDeletedComponent', () => {
  let component: ReminderItemListDeletedComponent;
  let fixture: ComponentFixture<ReminderItemListDeletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderItemListDeletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderItemListDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
