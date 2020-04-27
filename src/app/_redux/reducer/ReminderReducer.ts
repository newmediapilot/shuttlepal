import {IReminderItem} from '../interface/IReminderItem';
import {IReminderError} from '../interface/IReminderError';
import {IReminderReducerAction, ReminderActionType} from './ReminderReducerAction';

export interface IReminderState {
  reminders: Array<IReminderItem>;
  errors: Array<IReminderError>;
}

export const initialReminderState: IReminderState = {
  reminders: [],
  errors: []
};

export const ReminderReducer = (
  state = initialReminderState,
  action: IReminderReducerAction
): IReminderState => {
  switch (action.type) {
    case ReminderActionType.ReminderAddActionRequest: {
      return state;
    }
    case ReminderActionType.ReminderAddActionSuccess: {
      return {
        ...state,
        reminders: [...state.reminders, action.payload]
      }
    }
    case ReminderActionType.ReminderAddActionErrorEmpty: {
      return {
        ...state,
        reminders: [...state.errors, action.payload]
      }
    }
    case ReminderActionType.ReminderAddActionErrorDuplicate: {
      return {
        ...state,
        reminders: [...state.errors, action.payload]
      }
    }
  }
  return state;
};
