import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgReduxModule, NgRedux, DevToolsExtension} from '@angular-redux/store';
import {NgReduxRouterModule, NgReduxRouter} from '@angular-redux/router';
import {createLogger} from 'redux-logger';
import {IAppState, rootReducer} from './_core/root-reducer';

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
      {},
      [createLogger()]);
    ngReduxRouter.initialize();
  }
}
