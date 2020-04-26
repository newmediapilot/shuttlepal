import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderItemRenderComponent } from './reminder-item-render.component';

describe('ReminderItemRenderComponent', () => {
  let component: ReminderItemRenderComponent;
  let fixture: ComponentFixture<ReminderItemRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderItemRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderItemRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
