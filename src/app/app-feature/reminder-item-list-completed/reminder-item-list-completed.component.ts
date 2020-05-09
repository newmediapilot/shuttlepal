import {Component, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {IReminderItem} from '../../_redux/interface/IReminderItem';
import {IAppState} from '../../_redux/_core/RootState';
import {ReminderAction} from '../../_redux/reducer/ReminderAction';

@Component({
  selector: 'app-reminder-item-list-completed',
  templateUrl: './reminder-item-list-completed.component.html',
  styleUrls: ['./reminder-item-list-completed.component.scss']
})
export class ReminderItemListCompletedComponent implements OnInit {

  @select(['reminder', 'completed'])
  readonly reminders$: Observable<Array<IReminderItem>>;

  public confirmIndex: number = -1;

  constructor(private redux: NgRedux<IAppState>,
              private reminderReducerAction: ReminderAction,) {
  }

  ngOnInit() {
  }

  /**
   * show confirmation
   */
  reminderUnCompleteActionRequest(reminder) {
    this.redux.dispatch(this.reminderReducerAction.reminderUnCompleteActionRequest(reminder));
  }

  /**
   * reject deletion; hide confirmation
   */
  reminderUnCompleteActionRequestCancel() {
    this.confirmIndex = -1;
  }
}
