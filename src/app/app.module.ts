import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {IAppState} from './_redux/interface/iapp-state';
import {NgRedux} from '@angular-redux/store';
import {createLogger} from 'redux-logger';
import {rootReducer} from './_redux/root-reducer';
import {NgReduxRouter, NgReduxRouterModule} from '@angular-redux/router';
import {AppState} from './_redux/state/app-state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxRouterModule.forRoot(),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, ngReduxRouter: NgReduxRouter) {
    ngRedux.configureStore(rootReducer, AppState, [createLogger()]);
    ngReduxRouter.initialize();
  }
}
