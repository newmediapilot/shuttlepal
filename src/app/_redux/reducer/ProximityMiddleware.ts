import {Injectable} from '@angular/core';
import {IProximityReducerAction, ProximityAction, ProximityReducerActionType} from './ProximityAction';
import {ILocationStamp, LocationService} from '../../services/location.service';
import {IProximityItem} from '../interface/IProximityItem';
import {IAppState} from '../_core/RootState';
import {IReminderItem} from '../interface/IReminderItem';
import * as loDash from "lodash";

@Injectable({
  providedIn: 'root'
})
export class ProximityMiddleware {
  constructor(private proximityReducerAction: ProximityAction) {

  }

  proximityRequestUpdate = (store) => (next) => (action: IProximityReducerAction) => {
    if (action.type === ProximityReducerActionType.ProximityRequestUpdate) {
      var getState: IAppState = store.getState();
      LocationService.getLocation().subscribe(
        (position: ILocationStamp) => {
          var index = 0;
          var reminders: Array<IProximityItem> = loDash.map(getState.reminder.reminders, (reminder) => {
            return {
              ...reminder,
              distance: LocationService.calculateDistanceFromLocation({
                location1: reminder,
                location2: position
              }).distance,
            } as IProximityItem;
          }).sort(reminder => reminder.distance);
          store.dispatch(this.proximityReducerAction.proximityRequestUpdateSuccess(reminders));
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
      this.proximityRequestUpdate,
      this.proximityRequestUpdateSuccess,
      this.proximityRequestUpdateError
    ]
  }

}
