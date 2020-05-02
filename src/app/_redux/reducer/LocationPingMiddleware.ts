import {Injectable} from '@angular/core';
import {ILocationPingReducerAction} from './ILocationPingReducerAction';

@Injectable({
  providedIn: 'root'
})
export class LocationPingMiddleware {
  constructor() {
    //
  }

  locationPingCurrentLocation = (store) => (next) => (action: ILocationPingReducerAction) => {

  }
}
