import {IReminderItem} from '../interface/IReminderItem';
import {IReminderError} from '../interface/IReminderError';
import {IReminderReducerAction, ReminderActionType} from './ReminderAction';

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
        reminders: [...state.reminders, action.payload],
        errors: []
      }
    }
    case ReminderActionType.ReminderAddActionErrorEmpty: {
      console.log("ReminderActionType.ReminderAddActionErrorEmpty", action);
      return {
        ...state,
        errors: [...state.errors, action.payload]
      }
    }
    case ReminderActionType.ReminderAddActionErrorDuplicate: {
      console.log("ReminderActionType.ReminderAddActionErrorDuplicate", action);
      return {
        ...state,
        errors: [...state.errors, action.payload]
      }
    }

  }
  return state;
};
