import {Action} from 'redux';
import {Injectable} from '@angular/core';

export interface ILocationPingReducerAction extends Action {
  type: string;
  payload: any
}

export enum LocationPingReducerActionType {
  LocationPingCurrentLocation = '[LocationPingAction]LocationPingCurrentLocation',
  LocationPingCurrentLocationSuccess = '[LocationPingAction]LocationPingCurrentLocationSuccess',
  LocationPingCurrentLocationError = '[LocationPingAction]LocationPingCurrentLocationError',
  StartLocationPing = '[LocationPingAction]StartLocationPing'
}

@Injectable({providedIn: 'root'})
export class LocationPingAction {

  /**
   * starts the interval that checks current location
   * @param payload
   */
  startLocationPing(payload: any): ILocationPingReducerAction {
    return {
      type: LocationPingReducerActionType.StartLocationPing,
      payload: payload
    }
  }

  /**
   * triggered to notify app of current location
   * @param payload
   */
  locationPingCurrentLocation(payload: any): ILocationPingReducerAction {
    return {
      type: LocationPingReducerActionType.LocationPingCurrentLocation,
      payload: payload
    }
  }

  /**
   * triggered when location fetch is successful
   * @param payload
   */
  locationPingCurrentLocationSuccess(payload: any): ILocationPingReducerAction {
    return {
      type: LocationPingReducerActionType.LocationPingCurrentLocationSuccess,
      payload: payload
    }
  }

  /**
   * triggered when location fetch fails
   * @param payload
   */
  locationPingCurrentLocationError(payload: any): ILocationPingReducerAction {
    return {
      type: LocationPingReducerActionType.LocationPingCurrentLocationError,
      payload: payload
    }
  }
}
