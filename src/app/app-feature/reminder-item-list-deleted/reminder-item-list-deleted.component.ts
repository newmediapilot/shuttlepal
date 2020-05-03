import { Component, OnInit } from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {IReminderItem} from '../../_redux/interface/IReminderItem';
import {IAppState} from '../../_redux/_core/RootState';
import {ReminderAction} from '../../_redux/reducer/ReminderAction';

@Component({
  selector: 'app-reminder-item-list-deleted',
  templateUrl: './reminder-item-list-deleted.component.html',
  styleUrls: ['./reminder-item-list-deleted.component.scss']
})
export class ReminderItemListDeletedComponent implements OnInit {

  @select(['reminder', 'deleted'])
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
  reminderUnRemoveActionRequest($event, $index) {
    this.confirmIndex = $index;
  }

  /**
   * approve deletion
   */
  reminderUnRemoveActionRequestConfirm($event, reminder) {
    this.redux.dispatch(this.reminderReducerAction.reminderUnRemoveActionRequest(reminder));
    this.reminderUnRemoveActionRequestCancel();
  }

  /**
   * reject deletion; hide confirmation
   */
  reminderUnRemoveActionRequestCancel() {
    this.confirmIndex = -1;
  }
}
