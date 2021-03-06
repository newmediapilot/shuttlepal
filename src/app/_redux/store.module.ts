import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';
import {NgReduxRouter, NgReduxRouterModule} from '@angular-redux/router';
import {environment} from '../../environments/environment';
import {ReminderMiddleware} from './reducer/ReminderMiddleware';
import {AppState, IAppState} from './_core/RootState';
import {rootReducer} from './_core/RootReducer';
import {RootMiddleware} from './_core/RootMiddleware';
import {RootEpic} from './_core/RootEpic';
import {createEpicMiddleware} from 'redux-observable';
import * as loDash from 'lodash';

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
    private rootEpic: RootEpic
  ) {

    let enhancers = [];

    if (!environment.production && devTools.isEnabled()) {
      enhancers = [
        devTools.enhancer()
      ];
    }

    const epicMiddleware = createEpicMiddleware();

    store.configureStore(
      rootReducer,
      AppState,
      loDash.flatten([
        this.rootMiddleware.middleware(),
        epicMiddleware
      ]),
      enhancers);

    epicMiddleware.run(this.rootEpic.epic());

    ngReduxRouter.initialize();
  }
}
