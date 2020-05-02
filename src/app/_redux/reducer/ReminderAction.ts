import {Action} from 'redux';
import {Injectable} from '@angular/core';

export interface IReminderReducerAction extends Action {
  type: string;
  payload: any
}

export enum ReminderActionType {
  ReminderAddActionRequest = '[ReminderAction] ReminderAddActionRequest',
  ReminderAddActionSuccess = '[ReminderAction] ReminderAddActionSuccess',
  ReminderAddActionErrorDuplicate = '[ReminderAction] ReminderAddActionErrorDuplicate',
  ReminderAddActionErrorEmpty = '[ReminderAction] ReminderAddActionErrorEmpty',
  ReminderAddActionAddLocRequest = '[ReminderAction] ReminderAddActionAddLocRequest',
  ReminderAddActionAddLocSuccess = '[ReminderAction] ReminderAddActionAddLocSuccess',
  ReminderRemoveActionRequest = '[ReminderAction] ReminderRemoveActionRequest',
  ReminderRemoveActionSuccess = '[ReminderAction] ReminderRemoveActionSuccess',
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
   * triggered after add location to action
   * @param payload
   */
  reminderAddActionAddLocSuccess(payload: any): IReminderReducerAction {
    return {
      type: ReminderActionType.ReminderAddActionAddLocSuccess,
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
   * triggered to request a removal of an item
   * @param payload
   */
  reminderRemoveActionRequest(payload: any): IReminderReducerAction {
    return {
      type: ReminderActionType.ReminderRemoveActionRequest,
      payload: payload
    }
  }

  /**
   * triggered once item is removed successfully
   * @param payload
   */
  reminderRemoveActionSuccess(payload: any): IReminderReducerAction {
    return {
      type: ReminderActionType.ReminderRemoveActionSuccess,
      payload: payload
    }
  }
}
