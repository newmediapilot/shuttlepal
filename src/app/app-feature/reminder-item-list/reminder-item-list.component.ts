import {Component, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {IAppState} from '../../_redux/_core/RootState';
import {ReminderAction} from '../../_redux/reducer/ReminderAction';
import {IReminderItem} from '../../_redux/interface/IReminderItem';

@Component({
  selector: 'app-reminder-item-list',
  templateUrl: './reminder-item-list.component.html',
  styleUrls: ['./reminder-item-list.component.scss']
})
export class ReminderItemListComponent implements OnInit {

  @select(['reminder', 'reminders'])
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
  reminderRemoveActionRequest($event, $index) {
    this.confirmIndex = $index;
  }

  /**
   * approve deletion
   */
  reminderRemoveActionRequestConfirm($event, reminder) {
    this.redux.dispatch(this.reminderReducerAction.reminderRemoveActionRequest(reminder));
    this.reminderRemoveActionRequestCancel();
  }

  /**
   * reject deletion; hide confirmation
   */
  reminderRemoveActionRequestCancel() {
    this.confirmIndex = -1;
  }
}
