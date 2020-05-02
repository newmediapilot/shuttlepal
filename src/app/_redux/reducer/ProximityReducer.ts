import {IProximityReducerAction, ProximityReducerActionType} from './ProximityAction';
import {IReminderItem} from '../interface/IReminderItem';

export interface IProximityState {
  reminders: Array<IReminderItem>;
}

export const initialProximityState: IProximityState = {
  reminders: []
};

export const ProximityReducer = (
  state = initialProximityState,
  action: IProximityReducerAction
): IProximityState => {
  switch (action.type) {
    case ProximityReducerActionType.ProximityRequestUpdate: {
      return state;
    }
    case ProximityReducerActionType.ProximityRequestUpdateSuccess: {
      return state;
    }
    case ProximityReducerActionType.ProximityRequestUpdateError: {
      return state;
    }
  }
  return state;
};
