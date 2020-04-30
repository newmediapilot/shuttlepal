import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {createLogger} from 'redux-logger';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';
import {NgReduxRouter, NgReduxRouterModule} from '@angular-redux/router';
import {environment} from '../../environments/environment';
import {ReminderMiddleware} from './reducer/ReminderMiddleware';
import {AppState, IAppState} from './_core/RootState';
import {rootReducer} from './_core/RootReducer';
import {StorageMiddleware2} from './reducer/StorageMiddleware2';

@NgModule({
  imports: [CommonModule, NgReduxModule, NgReduxRouterModule.forRoot()],
  providers: [ReminderMiddleware],
})
export class StoreModule {
  constructor(
    private store: NgRedux<IAppState>,
    private devTools: DevToolsExtension,
    private ngReduxRouter: NgReduxRouter,
    private reminderReducerMiddleware: ReminderMiddleware,
    private storageMiddleware: StorageMiddleware2
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
    middleware = middleware.concat(reminderReducerMiddleware.middleware());
    middleware = middleware.concat(storageMiddleware.middleware());

    store.configureStore(
      rootReducer,
      AppState,
      middleware,
      enhancers);
    ngReduxRouter.initialize();
  }
}
