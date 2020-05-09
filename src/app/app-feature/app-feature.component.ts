import {Component, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../_redux/_core/RootState';
import {ProximityAction} from '../_redux/reducer/ProximityAction';
import {StorageService, StorageServiceSaveKey} from '../services/storage.service';
import {StorageActionType} from '../_redux/reducer/StorageAction';
import {IReminderReducerAction} from '../_redux/reducer/ReminderAction';
import {Observable} from 'rxjs';
import {IReminderItem} from '../_redux/interface/IReminderItem';

@Component({
  selector: 'app-app-feature',
  templateUrl: './app-feature.component.html',
  styleUrls: ['./app-feature.component.scss']
})
export class AppFeatureComponent implements OnInit {

  @select(['logger', 'logs'])
  readonly logs$: Observable<Array<IReminderItem>>;

  constructor(
    private redux: NgRedux<IAppState>,
    private proximityAction: ProximityAction,
  ) {
    this.redux.dispatch({
      type: StorageActionType.StorageGetRequest,
      payload: {
        key: StorageServiceSaveKey.ReminderItems
      }
    } as IReminderReducerAction);
    this.redux.dispatch(this.proximityAction.proximityActivateWatchPosition(null));
  }

  ngOnInit() {

  }

  /**
   * debug function only!
   */
  clearAllData() {
    if (window.confirm('clear all data forever?')) {
      StorageService.clearLocalStorage(StorageServiceSaveKey.ReminderItems);
      window.alert('data deleted... reloading app!');
      window.location.reload();
    }
  }

}
