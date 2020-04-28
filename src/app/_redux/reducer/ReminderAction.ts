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
}

@Injectable({providedIn: 'root'})
export class ReminderAction {
  reminderAddActionRequest(payload: any): IReminderReducerAction {
    return {
      type: ReminderActionType.ReminderAddActionRequest,
      payload: payload
    }
  }
  reminderAddActionSuccess(payload: any): IReminderReducerAction {
    return {
      type: ReminderActionType.ReminderAddActionSuccess,
      payload: payload
    }
  }
  reminderAddActionErrorDuplicate(payload: any): IReminderReducerAction {
    return {
      type: ReminderActionType.ReminderAddActionErrorDuplicate,
      payload: payload
    }
  }
  reminderAddActionErrorEmpty(payload: any): IReminderReducerAction {
    return {
      type: ReminderActionType.ReminderAddActionErrorEmpty,
      payload: payload
    }
  }
}
