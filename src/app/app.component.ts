import {Component} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {IReminderReducerAction, ReminderActionType} from './_redux/reducer/ReminderAction';
import {IAppState} from './_redux/_core/RootState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: NgRedux<IAppState>) {
    this.store.dispatch({
      type: ReminderActionType.ReminderStorageGetRequest,
      payload: null
    } as IReminderReducerAction);
  }
}
