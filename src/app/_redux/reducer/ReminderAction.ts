import {Action} from 'redux';
import {Injectable} from '@angular/core';

export interface IReminderReducerAction extends Action {
  type: string;
  payload: any
}

export enum ReminderActionType {
  ReminderAddActionRequest = 'ReminderAddActionRequest',
  ReminderAddActionSuccess = 'ReminderAddActionSuccess',
  ReminderAddActionErrorDuplicate = 'ReminderAddActionErrorDuplicate',
  ReminderAddActionErrorEmpty = 'ReminderAddActionErrorEmpty',
  ReminderStorageSaveRequest = 'ReminderStorageSaveRequest',
}

@Injectable({providedIn: 'root'})
export class ReminderAction {
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
   * triggered after store is updated to save to server etc.
   * @param payload
   */
  reminderStorageSaveRequest(payload: any): IReminderReducerAction {
    return {
      type: ReminderActionType.ReminderStorageSaveRequest,
      payload: payload
    }
  }
}
