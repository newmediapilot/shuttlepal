import {Component, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {IAppState} from '../../_redux/_core/RootState';
import {ReminderAction} from '../../_redux/reducer/ReminderAction';
import {IReminderItem} from '../../_redux/interface/IReminderItem';

@Component({
  selector: 'app-reminder-item-list-proximity',
  templateUrl: './reminder-item-list-proximity.component.html',
  styleUrls: ['./reminder-item-list-proximity.component.scss']
})
export class ReminderItemListProximityComponent implements OnInit {

  @select(['proximity', 'reminders'])
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
  reminderCompleteActionRequest($event, $index) {
    this.confirmIndex = $index;
  }

  /**
   * approve deletion
   */
  reminderCompleteActionRequestConfirm($event, reminder) {
    this.redux.dispatch(this.reminderReducerAction.reminderCompleteActionRequest(reminder));
    this.reminderCompleteActionRequestCancel();
  }

  /**
   * reject deletion; hide confirmation
   */
  reminderCompleteActionRequestCancel() {
    this.confirmIndex = -1;
  }
}
