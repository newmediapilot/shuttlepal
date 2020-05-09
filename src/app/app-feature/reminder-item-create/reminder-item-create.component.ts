import {Component, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {ReminderAction} from '../../_redux/reducer/ReminderAction';
import {observable, Observable} from 'rxjs';
import {IReminderError} from '../../_redux/interface/IReminderError';
import {IAppState} from '../../_redux/_core/RootState';
import {Route, Router} from '@angular/router';
import {distinctUntilChanged, map, skip, startWith} from 'rxjs/operators';
import {IReminderItem} from '../../_redux/interface/IReminderItem';

@Component({
  selector: 'app-reminder-item-create',
  templateUrl: './reminder-item-create.component.html',
  styleUrls: ['./reminder-item-create.component.scss']
})
export class ReminderItemCreateComponent implements OnInit {

  description: string;
  latitude: string;
  longitude: string;
  placeholder: string;

  @select(['reminder', 'errors'])
  readonly errors$: Observable<Array<IReminderError>>;

  @select(['reminder', 'reminders'])
  readonly reminders$: Observable<Array<IReminderItem>>;

  constructor(
    private router: Router,
    private redux: NgRedux<IAppState>,
    private reminderReducerAction: ReminderAction,
  ) {
    //
  }

  ngOnInit() {
    this.description = '';
    this.placeholder = 'enter reminder text';
    this.enableChangeSubscriptions();
  }

  enableChangeSubscriptions() {
    this.reminders$.pipe(
      skip(1),
      map(reminders => reminders.length),
      distinctUntilChanged()
    ).subscribe(data => {
      this.router.navigate(['v1', 'list']);
    });
  }

  /**
   * submit the request to create
   * @param $event
   */
  reminderAddActionRequest($event) {
    this.redux.dispatch(this.reminderReducerAction.reminderAddActionRequest(
      {
        description: this.description,
        latitude: this.latitude,
        longitude: this.longitude
      }));
  }

}
