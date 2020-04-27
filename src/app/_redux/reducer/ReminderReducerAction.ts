import {Action} from 'redux';
import {Injectable} from '@angular/core';

export interface IReminderReducerAction extends Action {
  type: string;
  payload: any
}

export enum ReminderActionType {
  ReminderAddAction = 'ReminderAddAction',
}

@Injectable({providedIn: 'root'})
export class ReminderReducerAction {
  reminderAddAction(payload: any): IReminderReducerAction {
    return {
      type: ReminderActionType.ReminderAddAction,
      payload: payload
    }
  }
}
