import {combineReducers} from 'redux';
import {routerReducer} from '@angular-redux/router';
import {ReminderReducer} from '../reducer/ReminderReducer';
import {LocationPingReducer} from '../reducer/LocationPingReducer';
import {ProximityReducer} from '../reducer/ProximityReducer';
import {LoggerReducer} from '../reducer/LoggerReducer';

export const rootReducer = combineReducers({
  router: routerReducer,
  reminder: ReminderReducer,
  location: LocationPingReducer,
  proximity: ProximityReducer,
  logger: LoggerReducer
});
