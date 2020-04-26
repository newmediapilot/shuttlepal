import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderItemListComponent } from './reminder-item-list.component';

describe('ReminderItemListComponent', () => {
  let component: ReminderItemListComponent;
  let fixture: ComponentFixture<ReminderItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
