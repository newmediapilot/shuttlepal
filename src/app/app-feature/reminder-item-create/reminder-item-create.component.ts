import {Component, OnInit} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../_redux/_core/root-state';
import {ReminderReducerAction} from '../../_redux/reducer/ReminderReducerAction';

@Component({
  selector: 'app-reminder-item-create',
  templateUrl: './reminder-item-create.component.html',
  styleUrls: ['./reminder-item-create.component.scss']
})
export class ReminderItemCreateComponent implements OnInit {

  description: string;

  constructor(
    private redux: NgRedux<IAppState>,
    private reminderReducerAction: ReminderReducerAction,
  ) {
  }

  ngOnInit() {
  }

  reminderAddActionClick($event) {
    this.redux.dispatch(this.reminderReducerAction.reminderAddAction({description: this.description}));
  }

}
