import {IReminderItem} from '../interface/IReminderItem';
import {IReminderError} from '../interface/IReminderError';
import {IReminderReducerAction, ReminderActionType} from './ReminderAction';
import * as loDash from "lodash";
import {StorageAction, StorageActionType} from './StorageAction';

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
    /**
     * storage
     */
    case StorageActionType.StorageGetSuccess: {
      return {
        ...state,
        reminders: (action.payload) || []
      };
    }
    /**
     * add item
     */
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
      return {
        ...state,
        reminders: [...state.reminders, action.payload],
        errors: []
      }
    }
    case ReminderActionType.ReminderAddActionAddLocSuccess: {
      return state;
    }
    /**
     * remove item
     */
    case ReminderActionType.ReminderRemoveActionRequest: {
      return {
        ...state,
        reminders: loDash.reject(state.reminders, action.payload)
      };
    }
    case ReminderActionType.ReminderRemoveActionSuccess: {
      return state;
    }
  }
  return state;
};
