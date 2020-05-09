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
        reminders: loDash.reject(state.reminders, (completed) => action.payload.id === completed.id),
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
        reminders: [...state.reminders, action.payload],
        completed: loDash.reject(state.completed, (uncompleted) => action.payload.id === uncompleted.id)
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
        reminders: loDash.reject(state.reminders, (deleted) => action.payload.id === deleted.id),
        deleted: [...state.deleted, action.payload],
      };
    }
    case ReminderActionType.ReminderRemoveActionSuccess: {
      return state;
    }
    /**
     * un-remove item
     */
    case ReminderActionType.ReminderUnRemoveActionRequest: {
      return {
        ...state,
        deleted: loDash.reject(state.deleted, (restored) => action.payload.id === restored.id),
        reminders: [...state.reminders, action.payload],
      };
    }
    case ReminderActionType.ReminderUnRemoveActionSuccess: {
      return state;
    }
    /**
     * eradicate item (perma delete)
     */
    case ReminderActionType.ReminderEradicateActionRequest: {
      return {
        ...state,
        deleted: loDash.reject(state.deleted, (eradicated) => action.payload.id === eradicated.id),
      };
    }
    case ReminderActionType.ReminderEradicateActionSuccess: {
      return state;
    }
  }
  return state;
};
