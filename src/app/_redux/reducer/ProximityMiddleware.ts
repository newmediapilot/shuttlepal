import {Injectable} from '@angular/core';
import {IProximityReducerAction, ProximityAction, ProximityReducerActionType} from './ProximityAction';
import {ILocationStamp, LocationService} from '../../services/location.service';
import {IProximityItem} from '../interface/IProximityItem';
import {IAppState} from '../_core/RootState';
import {IReminderItem} from '../interface/IReminderItem';
import * as loDash from "lodash";
import {DEFAULT_PERIMETER_SIZE} from '../../globals/location';
import {RandomService} from '../../services/random.service';

@Injectable({
  providedIn: 'root'
})
export class ProximityMiddleware {
  constructor(private proximityReducerAction: ProximityAction) {

  }

  proximityActivateWatchPosition = (store) => (next) => (action: IProximityReducerAction) => {
    if (action.type === ProximityReducerActionType.ProximityActivateWatchPosition) {
      LocationService.getLocation().subscribe(
        (position: ILocationStamp) => {
          store.dispatch(this.proximityReducerAction.proximityRequestUpdate(null));
        },
        (err) => {
          store.dispatch(this.proximityReducerAction.proximityRequestUpdateError(err));
        }
      )
    }
    next(action);
  };

  proximityRequestUpdate = (store) => (next) => (action: IProximityReducerAction) => {
    if (action.type === ProximityReducerActionType.ProximityRequestUpdate) {
      LocationService.getLocation().subscribe(
        (position: ILocationStamp) => {

          var getState: IAppState = store.getState();

          var processed: Array<IProximityItem> = loDash.map(getState.reminder.reminders, (originalReminder: IReminderItem) => {

            const distanceInMetersFromSelf = LocationService.calculateDistanceFromLocation({
              location1: originalReminder,
              location2: position
            }).distance;

            return {
              id: originalReminder.id,
              distance: distanceInMetersFromSelf,
              perimeter: DEFAULT_PERIMETER_SIZE,
              entered: distanceInMetersFromSelf <= DEFAULT_PERIMETER_SIZE,
              reminder: originalReminder,
            } as IProximityItem

          });

          store.dispatch(this.proximityReducerAction.proximityRequestUpdateSuccess(processed));

        },
        (err) => {
          store.dispatch(this.proximityReducerAction.proximityRequestUpdateError(null));
        }
      )
    }
    next(action);
  };

  proximityRequestUpdateSuccess = (store) => (next) => (action: IProximityReducerAction) => {
    if (action.type === ProximityReducerActionType.ProximityRequestUpdateSuccess) {
      // noop
    }
    next(action);
  };

  proximityRequestUpdateError = (store) => (next) => (action: IProximityReducerAction) => {
    if (action.type === ProximityReducerActionType.ProximityRequestUpdateError) {
      // noop
    }
    next(action);
  };

  middleware(): Array<Function> {
    console.log('ProximityMiddleware', this);
    return [
      this.proximityActivateWatchPosition,
      this.proximityRequestUpdate,
      this.proximityRequestUpdateSuccess,
      this.proximityRequestUpdateError
    ]
  }

}
