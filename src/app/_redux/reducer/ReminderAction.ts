import {Action} from 'redux';
import {Injectable} from '@angular/core';

export interface IReminderReducerAction extends Action {
  type: string;
  payload: any
}

export enum ReminderActionType {
  ReminderStorageGetRequest = 'ReminderStorageGetRequest',
  ReminderStorageGetSuccess = 'ReminderStorageGetSuccess',
  ReminderStorageGetError = 'ReminderStorageGetError',
  ReminderAddActionRequest = 'ReminderAddActionRequest',
  ReminderAddActionSuccess = 'ReminderAddActionSuccess',
  ReminderAddActionErrorDuplicate = 'ReminderAddActionErrorDuplicate',
  ReminderAddActionErrorEmpty = 'ReminderAddActionErrorEmpty',
  ReminderAddActionAddLocRequest = 'ReminderAddActionAddLocRequest',
  ReminderAddActionAddLocSuccess = 'ReminderAddActionAddLocSuccess',
  ReminderStorageSaveRequest = 'ReminderStorageSaveRequest',
  ReminderStorageSaveError = 'ReminderStorageSaveError',
  ReminderStorageSaveSuccess = 'ReminderStorageSaveSuccess',
}

@Injectable({providedIn: 'root'})
export class ReminderAction {

  /**
   * request for storage to be fetched from system
   * @param payload
   */
  reminderStorageGetRequest(payload: any): IReminderReducerAction {
    return {
      type: ReminderActionType.ReminderStorageGetRequest,
      payload: payload
    }
  }

  /**
   * storage from system fetched successfully
   * @param payload
   */
  reminderStorageGetSuccess(payload: any): IReminderReducerAction {
    return {
      type: ReminderActionType.ReminderStorageGetSuccess,
      payload: payload
    }
  }

  /**
   * trigger error if store request fails
   * @param payload
   */
  reminderStorageGetError(payload: any): IReminderReducerAction {
    return {
      type: ReminderActionType.ReminderStorageGetError,
      payload: payload
    }
  }

  /**
   * triggered by a button requesting an action to be added to store via payload
   * @param payload
   */
  reminderAddActionRequest(payload: any): IReminderReducerAction {
    return {
      type: ReminderActionType.ReminderAddActionRequest,
      payload: payload
    }
  }

  /**
   * triggered when validation passes in middleware to notify next action
   * @param payload
   */
  reminderAddActionSuccess(payload: any): IReminderReducerAction {
    return {
      type: ReminderActionType.ReminderAddActionSuccess,
      payload: payload
    }
  }

  /**
   * triggered if action description already exists
   * @param payload
   */
  reminderAddActionErrorDuplicate(payload: any): IReminderReducerAction {
    return {
      type: ReminderActionType.ReminderAddActionErrorDuplicate,
      payload: payload
    }
  }

  /**
   * triggered if requested payload is a blank
   * @param payload
   */
  reminderAddActionErrorEmpty(payload: any): IReminderReducerAction {
    return {
      type: ReminderActionType.ReminderAddActionErrorEmpty,
      payload: payload
    }
  }

  /**
   * triggered after store is updated to add location to action
   * @param payload
   */
  reminderAddActionAddLocRequest(payload: any): IReminderReducerAction {
    return {
      type: ReminderActionType.ReminderAddActionAddLocRequest,
      payload: payload
    }
  }

  /**
   * triggered after a successful save to add location params to object
   * @param payload
   */
  reminderAddActionRequestLocate(payload: any): IReminderReducerAction {
    return {
      type: ReminderActionType.ReminderAddActionAddLocRequest,
      payload: payload
    }
  }

  /**
   * triggered after a successful add location params to object
   * @param payload
   */
  reminderAddActionAddLocSuccess(payload: any): IReminderReducerAction {
    return {
      type: ReminderActionType.ReminderAddActionAddLocSuccess,
      payload: payload
    }
  }

  /**
   * triggered once data is ready to save to save to storage
   * @param payload
   */
  reminderStorageSaveRequest(payload: any): IReminderReducerAction {
    return {
      type: ReminderActionType.ReminderStorageSaveRequest,
      payload: payload
    }
  }

  /**
   * triggered after data is errored while saving to storage
   * @param payload
   */
  reminderStorageSaveError(payload: any): IReminderReducerAction {
    return {
      type: ReminderActionType.ReminderStorageSaveError,
      payload: payload
    }
  }

  /**
   * triggered after data is errored while saving to storage
   * @param payload
   */
  reminderStorageSaveSuccess(payload: any): IReminderReducerAction {
    return {
      type: ReminderActionType.ReminderStorageSaveSuccess,
      payload: payload
    }
  }
}
