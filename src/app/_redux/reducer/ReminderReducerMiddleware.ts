import {IReminderReducerAction, ReminderActionType, ReminderReducerAction} from './ReminderReducerAction';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReminderReducerMiddleware {
  constructor(private reminderReducerAction: ReminderReducerAction) {

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
          description: "Empty!",
          timestamp: new Date().getTime()
        }))
      } else if (!!curState.reminder.reminders.find((item) => item.description === action.payload.description)) {
        /**
         * error: duplicate
         */
        store.dispatch(this.reminderReducerAction.reminderAddActionErrorDuplicate({
          description: "Duplicate!",
          timestamp: new Date().getTime()
        }))
      } else {
        /**
         * success
         */
        store.dispatch(this.reminderReducerAction.reminderAddActionSuccess({
          description: action.payload.description,
          timestamp: new Date().getTime()
        }))
      }
    }
    next(action);
  };

  middleware() {
    return [
      this.reminderAddActionRequest
    ]
  }

}
