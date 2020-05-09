import {Component, OnInit} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../_redux/_core/RootState';
import {ProximityAction} from '../_redux/reducer/ProximityAction';
import {StorageService, StorageServiceSaveKey} from '../services/storage.service';

@Component({
  selector: 'app-app-feature',
  templateUrl: './app-feature.component.html',
  styleUrls: ['./app-feature.component.scss']
})
export class AppFeatureComponent implements OnInit {

  constructor(
    private redux: NgRedux<IAppState>,
    private proximityAction: ProximityAction
  ) {
    this.redux.dispatch(this.proximityAction.proximityActivateWatchPosition(null));
    console.log('AppFeatureComponent ready...');
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
