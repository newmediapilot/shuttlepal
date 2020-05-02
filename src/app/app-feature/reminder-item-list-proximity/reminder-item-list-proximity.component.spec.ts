import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderItemListProximityComponent } from './reminder-item-list-proximity.component';

describe('ReminderItemListProximityComponent', () => {
  let component: ReminderItemListProximityComponent;
  let fixture: ComponentFixture<ReminderItemListProximityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderItemListProximityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderItemListProximityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
