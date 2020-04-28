import {IReminderReducerAction, ReminderActionType, ReminderAction} from './ReminderAction';
import {Injectable} from '@angular/core';
import {IReminderItem} from '../interface/IReminderItem';
import {IReminderError} from '../interface/IReminderError';

@Injectable({
  providedIn: 'root'
})
export class ReminderMiddleware {
  constructor(private reminderReducerAction: ReminderAction) {

  }

  reminderAddActionRequest = (store) => (next) => (action: IReminderReducerAction) => {
    var curState = store.getState();
    if (action.type === ReminderActionType.ReminderAddActionRequest) {
      /**
       * test payload contents
       */
      if (!action.payload.description || action.payload.description.trim().length === 0) {
        /**
         * error: empty
         */
        store.dispatch(this.reminderReducerAction.reminderAddActionErrorEmpty({
          description: "reminderAddActionErrorEmpty!",
          meta: null
        } as IReminderError))
      } else if (!!curState.reminder.reminders.find((item) => item.description === action.payload.description)) {
        /**
         * error: duplicate
         */
        store.dispatch(this.reminderReducerAction.reminderAddActionErrorDuplicate({
          description: "reminderAddActionErrorDuplicate!",
          meta: null
        } as IReminderError))
      } else {
        /**
         * success
         */
        store.dispatch(this.reminderReducerAction.reminderAddActionSuccess({
          description: action.payload.description,
          latitude: 0,
          longitude: 0,
          timestamp: new Date().getTime()
        } as IReminderItem))
      }
    }
    next(action);
  };

  reminderAddActionSuccess = (store) => (next) => (action: IReminderReducerAction) => {
    var curState = store.getState();
    if (action.type === ReminderActionType.ReminderAddActionSuccess) {

    }
  };

  middleware() {
    return [
      this.reminderAddActionRequest,
      this.reminderAddActionSuccess
    ]
  }

}
