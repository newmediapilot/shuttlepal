import {combineReducers} from 'redux';
import {routerReducer} from '@angular-redux/router';
import {IReminderState, ReminderReducer} from '../reducer/ReminderReducer';
import {LocationPingReducer} from '../reducer/LocationPingReducer';

export const rootReducer = combineReducers({
  router: routerReducer,
  reminder: ReminderReducer,
  location:LocationPingReducer
});
