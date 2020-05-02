import {Injectable} from '@angular/core';
import {ILocationStamp, LocationService} from '../../services/location.service';
import {ILocationPingItem} from '../interface/ILocationPingItem';
import {ILocationPingReducerAction, LocationPingAction, LocationPingReducerActionType} from './LocationPingAction';

@Injectable({
  providedIn: 'root'
})
export class LocationPingMiddleware {
  constructor(private locationPingReducerAction: LocationPingAction) {

  }

  startLocationPing = (store) => (next) => (action: ILocationPingReducerAction) => {
    if (action.type === LocationPingReducerActionType.StartLocationPing) {
      setInterval(() => {
        store.dispatch(this.locationPingReducerAction.locationPingCurrentLocation(null));
      }, 15000);
    }
    next(action);
  };

  locationPingCurrentLocation = (store) => (next) => (action: ILocationPingReducerAction) => {
    if (action.type === LocationPingReducerActionType.LocationPingCurrentLocation) {
      LocationService.getLocation().subscribe(
        (position: ILocationStamp) => {
          let locationItem: ILocationPingItem = {
            latitude: position.latitude,
            longitude: position.longitude,
            timestamp: new Date().getTime(),
          };
          store.dispatch(this.locationPingReducerAction.locationPingCurrentLocationSuccess(locationItem));
        },
        (err) => {
          store.dispatch(this.locationPingReducerAction.locationPingCurrentLocationError(null));
        }
      )
    }
    next(action);
  };

  locationPingCurrentLocationSuccess = (store) => (next) => (action: ILocationPingReducerAction) => {
    if (action.type === LocationPingReducerActionType.LocationPingCurrentLocationSuccess) {
      // noop
    }
    next(action);
  };

  locationPingCurrentLocationError = (store) => (next) => (action: ILocationPingReducerAction) => {
    if (action.type === LocationPingReducerActionType.LocationPingCurrentLocationError) {
      // noop
    }
    next(action);
  };

  middleware(): Array<Function> {
    console.log('LocationPingMiddleware', this);
    return [
      this.startLocationPing,
      this.locationPingCurrentLocation,
      this.locationPingCurrentLocationSuccess,
      this.locationPingCurrentLocationError,
    ]
  }

}
