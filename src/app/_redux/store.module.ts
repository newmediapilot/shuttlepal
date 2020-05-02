import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';
import {NgReduxRouter, NgReduxRouterModule} from '@angular-redux/router';
import {environment} from '../../environments/environment';
import {ReminderMiddleware} from './reducer/ReminderMiddleware';
import {AppState, IAppState} from './_core/RootState';
import {rootReducer} from './_core/RootReducer';
import {StorageEpic} from './reducer/StorageEpic';
import {RootMiddleware} from './_core/RootMiddleware';

@NgModule({
  imports: [CommonModule, NgReduxModule, NgReduxRouterModule.forRoot()],
  providers: [ReminderMiddleware],
})
export class StoreModule {
  constructor(
    private store: NgRedux<IAppState>,
    private devTools: DevToolsExtension,
    private ngReduxRouter: NgReduxRouter,
    private rootMiddleware: RootMiddleware,
    private storageEpic: StorageEpic
  ) {

    let enhancers = [];

    // only want to expose this tool in devMode.
    if (!environment.production && devTools.isEnabled()) {
      enhancers = [
        devTools.enhancer()
      ];
    }

    store.configureStore(
      rootReducer,
      AppState,
      this.rootMiddleware.middleware(),
      enhancers);

    const epicMiddleware = createEpicMiddleware();
    epicMiddleware.run(combineEpics(storageEpic.storageSaveRequest));

    ngReduxRouter.initialize();

  }
}
