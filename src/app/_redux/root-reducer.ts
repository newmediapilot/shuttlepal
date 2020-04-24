import {combineReducers} from 'redux';
import {routerReducer} from '@angular-redux/router';

export const rootReducer = combineReducers(
  {
    routerReducer: routerReducer
  }
);
