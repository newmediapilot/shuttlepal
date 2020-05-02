import {ILocationPingItem} from '../interface/ILocationPingItem';
import {ILocationPingReducerAction, LocationPingReducerActionType} from './LocationPingAction';

export interface ILocationPingState {
  locations: Array<ILocationPingItem>;
  lastLocation: ILocationPingItem;
}

export const initialLocationPingState: ILocationPingState = {
  locations: [],
  lastLocation: null
};

export const LocationPingReducer = (
  state = initialLocationPingState,
  action: ILocationPingReducerAction
): ILocationPingState => {
  switch (action.type) {
    case LocationPingReducerActionType.StartLocationPing: {
      return state;
    }
    case LocationPingReducerActionType.LocationPingCurrentLocation: {
      return state;
    }
    case LocationPingReducerActionType.LocationPingCurrentLocationSuccess: {
      console.log('action.payload', action);
      return {
        lastLocation: action.payload,
        locations: [...state.locations, action.payload]
      };
    }
    case LocationPingReducerActionType.LocationPingCurrentLocationError: {
      return state;
    }
  }
  return state;
};
