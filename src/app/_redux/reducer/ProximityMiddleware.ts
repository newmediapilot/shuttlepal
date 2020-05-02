import {Injectable} from '@angular/core';
import {IProximityReducerAction, ProximityAction, ProximityReducerActionType} from './ProximityAction';

@Injectable({
  providedIn: 'root'
})
export class ProximityMiddleware {
  constructor(private proximityReducerAction: ProximityAction) {

  }

  proximityRequestUpdate = (store) => (next) => (action: IProximityReducerAction) => {
    if (action.type === ProximityReducerActionType.ProximityRequestUpdate) {
      // noop
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
