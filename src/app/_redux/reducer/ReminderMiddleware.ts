import {IReminderReducerAction, ReminderActionType, ReminderAction} from './ReminderAction';
import {Injectable} from '@angular/core';
import {IReminderItem} from '../interface/IReminderItem';
import {IReminderError, ReminderError} from '../interface/IReminderError';
import {Middleware} from 'redux';
import {ILocationStamp, LocationService} from '../../services/location.service';
import {StorageServiceSaveKey, StorageService} from '../../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ReminderMiddleware {
  constructor(private reminderReducerAction: ReminderAction) {
    //
  }

  reminderStorageGetRequest = (store) => (next) => (action: IReminderReducerAction) => {
    var curState = store.getState();
    if (action.type === ReminderActionType.ReminderStorageGetRequest) {
      try {
        let reminders: Array<IReminderItem> = JSON.parse(StorageService.fetchLocalStore(StorageServiceSaveKey.ReminderItems));
        if (!reminders) {
          reminders = [];
        }
        store.dispatch(this.reminderReducerAction.reminderStorageGetSuccess(reminders))
      } catch (e) {
        store.dispatch(this.reminderReducerAction.reminderStorageGetError(e))
      }
    }
    next(action);
  };

  reminderStorageSaveRequest = (store) => (next) => (action: IReminderReducerAction) => {
    var curState = store.getState();
    if (action.type === ReminderActionType.ReminderStorageSaveRequest) {
      StorageService.saveLocalStore(StorageServiceSaveKey.ReminderItems, JSON.stringify(curState.reminder.reminders));
      store.dispatch(this.reminderReducerAction.reminderStorageSaveSuccess(null));
    }
    next(action);
  };

  reminderStorageSaveSuccess = (store) => (next) => (action: IReminderReducerAction) => {
    var curState = store.getState();
    if (action.type === ReminderActionType.ReminderStorageSaveSuccess) {
      // do something
    }
    next(action);
  };

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
          description: ReminderError.ReminderItemErrorEmpty,
          meta: null
        } as IReminderError))
      } else if (!!curState.reminder.reminders.find((item) => item.description === action.payload.description)) {
        /**
         * error: duplicate
         */
        store.dispatch(this.reminderReducerAction.reminderAddActionErrorDuplicate({
          description: ReminderError.ReminderItemErrorDuplicate,
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
      store.dispatch(this.reminderReducerAction.reminderAddActionAddLocRequest(action.payload as IReminderItem))
    }
    next(action);
  };

  reminderAddActionAddLocRequest = (store) => (next) => (action: IReminderReducerAction) => {
    var curState = store.getState();
    if (action.type === ReminderActionType.ReminderAddActionAddLocRequest) {
      LocationService.getLocation().subscribe(
        (position: ILocationStamp) => {
          action.payload.latitude = position.latitude;
          action.payload.longitude = position.longitude;
          store.dispatch(this.reminderReducerAction.reminderAddActionAddLocSuccess(action.payload as IReminderItem))
        },
        (err) => {
          console.log('Error Getting Location: ', err);
        }
      )
    }
    next(action);
  };

  reminderAddActionAddLocSuccess = (store) => (next) => (action: IReminderReducerAction) => {
    var curState = store.getState();
    if (action.type === ReminderActionType.ReminderAddActionAddLocSuccess) {
      store.dispatch(this.reminderReducerAction.reminderStorageSaveRequest(null));
    }
    next(action);
  };

  reminderRemoveRequest = (store) => (next) => (action: IReminderReducerAction) => {
    var curState = store.getState();
    if (action.type === ReminderActionType.ReminderAddActionAddLocSuccess) {
      store.dispatch(this.reminderReducerAction.reminderStorageSaveRequest(null));
    }
    next(action);
  };

  middleware(): Array<Middleware> {
    return [
      this.reminderStorageGetRequest,
      this.reminderAddActionRequest,
      this.reminderAddActionSuccess,
      this.reminderAddActionAddLocRequest,
      this.reminderAddActionAddLocSuccess,
      this.reminderStorageSaveRequest,
      this.reminderStorageSaveSuccess
    ]
  }

}
