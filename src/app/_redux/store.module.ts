import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {createLogger} from 'redux-logger';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';
import {NgReduxRouter, NgReduxRouterModule} from '@angular-redux/router';
import {AppState, IAppState} from './_core/root-state';
import {rootReducer} from './_core/root-reducer';

@NgModule({
  imports: [CommonModule, NgReduxModule, NgReduxRouterModule.forRoot()],
  providers: [],
})
export class StoreModule {
  constructor(
    public store: NgRedux<IAppState>,
    devTools: DevToolsExtension,
    ngReduxRouter: NgReduxRouter
  ) {
    store.configureStore(
      rootReducer,
      AppState,
      [createLogger()]);
    ngReduxRouter.initialize();
  }
}
