import {Component, OnInit} from '@angular/core';
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

  public confirmIndex1: number = -1;

  constructor(private redux: NgRedux<IAppState>,
              private reminderReducerAction: ReminderAction,) {
  }

  ngOnInit() {
  }

  /**
   * restore item
   */
  reminderUnRemoveActionRequest($event, reminder) {
    this.redux.dispatch(this.reminderReducerAction.reminderUnRemoveActionRequest(reminder));
  }

  /**
   * delete forever
   */
  reminderEradicateActionRequest($event, $index) {
    this.confirmIndex1 = $index;
  }

  reminderEradicateActionRequestConfirm($event, reminder) {
    this.redux.dispatch(this.reminderReducerAction.reminderEradicateActionRequest(reminder));
    this.reminderEradicateActionRequestCancel();
  }

  /**
   * reject deletion; hide confirmation
   */
  reminderEradicateActionRequestCancel() {
    this.confirmIndex1 = -1;
  }

}
