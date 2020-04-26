import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderItemCreateComponent } from './reminder-item-create.component';

describe('ReminderItemCreateComponent', () => {
  let component: ReminderItemCreateComponent;
  let fixture: ComponentFixture<ReminderItemCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderItemCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderItemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
