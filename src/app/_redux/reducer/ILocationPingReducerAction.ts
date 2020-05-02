import {Action} from 'redux';
import {Injectable} from '@angular/core';

export interface ILocationPingReducerAction extends Action {
  type: string;
  payload: any
}

export enum LocationPingActionType {
  LocationPingCurrentLocation = 'LocationPingCurrentLocation'
}

@Injectable({providedIn: 'root'})
export class LocationPingAction {

  /**
   * triggered to notify app of current location
   * @param payload
   */
  locationPingCurrentLocation(payload: any): ILocationPingReducerAction {
    return {
      type: LocationPingActionType.LocationPingCurrentLocation,
      payload: payload
    }
  }
}
