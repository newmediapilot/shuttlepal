import {IReminderItem} from '../interface/IReminderItem';
import {IReminderError} from '../interface/IReminderError';
import {IReminderReducerAction, ReminderActionType} from './ReminderAction';
import * as loDash from "lodash";
import {StorageAction, StorageActionType} from './StorageAction';

export interface IReminderState {
  reminders: Array<IReminderItem>;
  completed: Array<IReminderItem>;
  deleted: Array<IReminderItem>;
  errors: Array<IReminderError>;
}

export const initialReminderState: IReminderState = {
  reminders: [],
  completed: [],
  deleted: [],
  errors: [],
};

export const ReminderReducer = (
  state = initialReminderState,
  action: IReminderReducerAction
): IReminderState => {
  switch (action.type) {
    /**
     * from storage
     */
    case StorageActionType.StorageGetSuccess: {
      state = action.payload || initialReminderState;
      return state;
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
     * complete item
     */
    case ReminderActionType.ReminderCompleteActionRequest: {
      return {
        ...state,
        reminders: loDash.reject(state.reminders, action.payload),
        completed: [...state.completed, action.payload],
      };
    }
    case ReminderActionType.ReminderCompleteActionSuccess: {
      return state;
    }
    /**
     * un-complete item
     */
    case ReminderActionType.ReminderUnCompleteActionRequest: {
      return {
        ...state,
        completed: loDash.reject(state.completed, action.payload),
        reminders: [...state.reminders, action.payload],
      };
    }
    case ReminderActionType.ReminderUnCompleteActionSuccess: {
      return state;
    }
    /**
     * remove item
     */
    case ReminderActionType.ReminderRemoveActionRequest: {
      return {
        ...state,
        reminders: loDash.reject(state.reminders, action.payload),
        deleted: [...state.deleted, action.payload],
      };
    }
    case ReminderActionType.ReminderRemoveActionSuccess: {
      return state;
    }
    /**
     * eradicate item
     */
    case ReminderActionType.ReminderEradicateActionRequest: {
      return {
        ...state,
        deleted: loDash.reject(state.deleted, action.payload)
      };
    }
    case ReminderActionType.ReminderEradicateActionSuccess: {
      return state;
    }
    /**
     * un-remove item
     */
    case ReminderActionType.ReminderUnRemoveActionRequest: {
      return {
        ...state,
        deleted: loDash.reject(state.deleted, action.payload),
        reminders: [...state.reminders, action.payload],
      };
    }
    case ReminderActionType.ReminderUnRemoveActionSuccess: {
      return state;
    }
  }
  return state;
};
