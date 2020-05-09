import {IProximityReducerAction, ProximityReducerActionType} from './ProximityAction';
import {IReminderItem} from '../interface/IReminderItem';
import * as loDash from 'lodash';

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
      state.reminders = [...action.payload];
      return state;
    }
    case ProximityReducerActionType.ProximityRequestUpdateError: {
      return state;
    }
    case ProximityReducerActionType.ProximityRemoveActionRequest: {
      return {
        ...state,
        reminders: loDash.reject(state.reminders, (removed) => action.payload.id === removed.id)
      };
    }
  }
  return state;
};
