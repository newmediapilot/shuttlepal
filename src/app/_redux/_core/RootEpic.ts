import {Injectable} from '@angular/core';
import {combineEpics, Epic, ofType} from 'redux-observable';
import {mapTo,} from 'rxjs/operators';
import {Action} from 'redux';
import {ReminderActionType} from '../reducer/ReminderAction';
import {ProximityReducerActionType} from '../reducer/ProximityAction';

@Injectable({
  providedIn: 'root'
})
export class RootEpic {

  reminderUpdatedAction() {
    return action$ => action$.pipe(
      ofType(
        ReminderActionType.ReminderAddActionSuccess,
        ReminderActionType.ReminderCompleteActionSuccess,
        ReminderActionType.ReminderUnCompleteActionSuccess,
        ReminderActionType.ReminderRemoveActionSuccess,
        ReminderActionType.ReminderUnRemoveActionSuccess
      ),
      mapTo({
        type: ProximityReducerActionType.ProximityRequestUpdate,
        payload: null
      })
    );
  }

  epic(): Epic<Action<any>> {
    return combineEpics(
      this.reminderUpdatedAction()
    )
  }
  
}
