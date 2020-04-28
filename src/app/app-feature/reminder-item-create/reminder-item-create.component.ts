import {Component, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../_redux/_core/root-state';
import {ReminderAction} from '../../_redux/reducer/ReminderAction';
import {Observable} from 'rxjs';
import {IReminderError} from '../../_redux/interface/IReminderError';

@Component({
  selector: 'app-reminder-item-create',
  templateUrl: './reminder-item-create.component.html',
  styleUrls: ['./reminder-item-create.component.scss']
})
export class ReminderItemCreateComponent implements OnInit {

  description: string;
  placeholder: string;

  @select(['reminder', 'errors'])
  readonly errors$: Observable<Array<IReminderError>>;

  constructor(
    private redux: NgRedux<IAppState>,
    private reminderReducerAction: ReminderAction,
  ) {
  }

  ngOnInit() {
    this.description = '';
    this.placeholder = 'enter reminder text';
  }

  reminderAddActionRequest($event) {
    this.redux.dispatch(this.reminderReducerAction.reminderAddActionRequest({description: this.description}));
  }

}
