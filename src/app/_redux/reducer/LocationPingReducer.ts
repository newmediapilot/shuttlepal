import {ILocationPingItem} from '../interface/ILocationPingItem';
import * as loDash from "lodash";
import {StorageAction, StorageActionType} from './StorageAction';
import {ILocationPingReducerAction, LocationPingActionType} from './ILocationPingReducerAction';

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
    /**
     * storage
     */
    case LocationPingActionType.LocationPingCurrentLocation: {
      return {
        lastLocation: action.payload,
        locations: [...state.locations, action.payload]
      };
    }
  }
  return state;
};
