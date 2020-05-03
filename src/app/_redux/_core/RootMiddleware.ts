import {createLogger} from 'redux-logger';
import {ReminderMiddleware} from '../reducer/ReminderMiddleware';
import {StorageMiddleware2} from '../reducer/StorageMiddleware2';
import * as loDash from "lodash";
import {Injectable} from '@angular/core';
import {Middleware} from 'redux';
import {LocationPingMiddleware} from '../reducer/LocationPingMiddleware';
import {ProximityMiddleware} from '../reducer/ProximityMiddleware';

@Injectable({
  providedIn: 'root'
})
export class RootMiddleware {
  constructor(
    private reminderReducerMiddleware: ReminderMiddleware,
    private storageMiddleware: StorageMiddleware2,
    private locationPingMiddleware: LocationPingMiddleware,
    private proximityMiddleware: ProximityMiddleware
  ) {
  }

  middleware(): Array<Middleware> {
    return loDash.flatten([
      createLogger(),
      this.reminderReducerMiddleware.middleware(),
      this.storageMiddleware.middleware(),
      this.locationPingMiddleware.middleware(),
      this.proximityMiddleware.middleware(),
    ]) as Array<Middleware>;
  }
}
