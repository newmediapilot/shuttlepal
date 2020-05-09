import {Component, OnInit} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../_redux/_core/RootState';
import {ProximityAction} from '../_redux/reducer/ProximityAction';

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

}
