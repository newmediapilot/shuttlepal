import {createLogger} from 'redux-logger';
import {ReminderMiddleware} from '../reducer/ReminderMiddleware';
import {StorageMiddleware2} from '../reducer/StorageMiddleware2';
import * as loDash from "lodash";
import {Injectable} from '@angular/core';
import {Middleware} from 'redux';
import {LocationPingMiddleware} from '../reducer/LocationPingMiddleware';

@Injectable({
  providedIn: 'root'
})
export class RootMiddleware {
  constructor(
    private reminderReducerMiddleware: ReminderMiddleware,
    private storageMiddleware: StorageMiddleware2,
    private locationPingMiddleware:LocationPingMiddleware
  ) {
  }

  middleware():Array<Middleware> {
    return loDash.flatten([
      createLogger(),
      this.reminderReducerMiddleware.middleware(),
      this.storageMiddleware.middleware(),
      this.locationPingMiddleware.middleware(),
    ]) as Array<Middleware>;
  }
}
