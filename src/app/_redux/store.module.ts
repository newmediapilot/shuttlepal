import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {createLogger} from 'redux-logger';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';
import {NgReduxRouter, NgReduxRouterModule} from '@angular-redux/router';
import {AppState, IAppState} from './_core/root-state';
import {rootReducer} from './_core/root-reducer';
import {environment} from '../../environments/environment';
import {ReminderMiddleware} from './reducer/ReminderMiddleware';

@NgModule({
  imports: [CommonModule, NgReduxModule, NgReduxRouterModule.forRoot()],
  providers: [ReminderMiddleware],
})
export class StoreModule {
  constructor(
    private store: NgRedux<IAppState>,
    private devTools: DevToolsExtension,
    private ngReduxRouter: NgReduxRouter,
    private reminderReducerMiddleware: ReminderMiddleware
  ) {

    let enhancers = [];

    // only want to expose this tool in devMode.
    if (!environment.production && devTools.isEnabled()) {
      enhancers = [
        devTools.enhancer()
      ];
    }

    let middleware = [];
    middleware.push(createLogger());
    middleware.concat(reminderReducerMiddleware.middleware());

    store.configureStore(
      rootReducer,
      AppState,
      middleware,
      enhancers);
    ngReduxRouter.initialize();
  }
}
