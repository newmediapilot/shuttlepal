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
    case ReminderActionType.ReminderAddActionErrorEmpty: {
      return {
        ...state,
        errors: [...state.errors, action.payload]
      }
    }
    case ReminderActionType.ReminderAddActionErrorDuplicate: {
      return {
        ...state,
        errors: [...state.errors, action.payload]
      }
    }
    case ReminderActionType.ReminderAddActionSuccess: {
      return state;
    }
    case ReminderActionType.ReminderAddActionAddLocRequest: {
      return state;
    }
    case ReminderActionType.ReminderAddActionAddLocSuccess: {
      return {
        ...state,
        reminders: [...state.reminders, action.payload],
        errors: []
      }
    }
    case ReminderActionType.ReminderStorageSaveRequest: {
      return state;
    }
    case ReminderActionType.ReminderStorageSaveSuccess: {
      return state;
    }
  }
  return state;
};
