import {Component} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {IReminderReducerAction, ReminderActionType} from './_redux/reducer/ReminderAction';
import {IAppState} from './_redux/_core/RootState';
import {IStoragePayload} from './_redux/interface/IStoragePayload';
import {StorageServiceSaveKey} from './services/storage.service';
import {StorageActionType} from './_redux/reducer/StorageAction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: NgRedux<IAppState>) {
    this.store.dispatch({
      type: StorageActionType.StorageGetRequest,
      payload: {
        key: StorageServiceSaveKey.ReminderItems
      }
    } as IReminderReducerAction);
  }
}
