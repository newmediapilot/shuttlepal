import {combineReducers} from 'redux';
import {routerReducer} from '@angular-redux/router';
import {IReminderState, ReminderReducer} from '../reducer/ReminderReducer';

export interface IAppState {
  router: string;
  reminder: IReminderState;
}

export const rootReducer = combineReducers({
  router: routerReducer,
  reminder: ReminderReducer
});
