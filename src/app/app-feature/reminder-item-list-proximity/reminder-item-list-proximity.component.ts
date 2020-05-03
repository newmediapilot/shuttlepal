import {Component, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {IAppState} from '../../_redux/_core/RootState';
import {ReminderAction} from '../../_redux/reducer/ReminderAction';
import {IReminderItem} from '../../_redux/interface/IReminderItem';
import {ProximityAction} from '../../_redux/reducer/ProximityAction';
import {IProximityItem} from '../../_redux/interface/IProximityItem';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reminder-item-list-proximity',
  templateUrl: './reminder-item-list-proximity.component.html',
  styleUrls: ['./reminder-item-list-proximity.component.scss']
})
export class ReminderItemListProximityComponent implements OnInit {

  @select(['proximity', 'reminders'])
  readonly reminders$: Observable<Array<IProximityItem>>;

  public confirmIndex: number = -1;

  constructor(private router: Router,
              private redux: NgRedux<IAppState>,
              private proximityAction: ProximityAction,
              private reminderReducerAction: ReminderAction,) {
  }

  ngOnInit() {
    //
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
   * update proximity list
   */
  proximityRequestUpdate() {
    this.redux.dispatch(this.proximityAction.proximityRequestUpdate(null));
  }

  /**
   * reject deletion; hide confirmation
   */
  reminderCompleteActionRequestCancel() {
    this.confirmIndex = -1;
  }
}
