import {Injectable} from '@angular/core';
import {IProximityReducerAction, ProximityAction, ProximityReducerActionType} from './ProximityAction';
import {ILocationStamp, LocationService} from '../../services/location.service';
import {ILocationPingItem} from '../interface/ILocationPingItem';
import {IProximityItem} from '../interface/IProximityItem';
import {IAppState} from '../_core/RootState';
import {IReminderItem} from '../interface/IReminderItem';

@Injectable({
  providedIn: 'root'
})
export class ProximityMiddleware {
  constructor(private proximityReducerAction: ProximityAction) {

  }

  proximityRequestUpdate = (store) => (next) => (action: IProximityReducerAction) => {
    if (action.type === ProximityReducerActionType.ProximityRequestUpdate) {
      LocationService.getLocation().subscribe(
        (position: ILocationStamp) => {
          var getState: IAppState = store.getState();
          console.log('proximityRequestUpdate.getState', getState);
          var reminders: Array<IReminderItem> = getState.reminder.reminders;
          var proximityReminders: Array<IProximityItem> = [];
          reminders.forEach((reminder) => {
            proximityReminders.push({
              ...reminder,
              /**
               * distance between reminder and user
               */
              proximity_distance: LocationService.calculateDistanceFromLocation({
                location1: {...reminder},
                location2: {...position}
              }).distance,
              /**
               * timestamp checked
               */
              proximity_timestamp: new Date().getTime(),
              /**
               * whether user is within tolerance distance
               */
              proximity_entered: LocationService.testRadiusPerimeterEntered({
                location1: {...reminder},
                location2: {...position},
                distanceValue: 10
              }),
            });
          });
          store.dispatch(this.proximityReducerAction.proximityRequestUpdateSuccess(proximityReminders));
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
