import {IReminderReducerAction, ReminderActionType, ReminderAction} from './ReminderAction';
import {Injectable} from '@angular/core';
import {IReminderItem} from '../interface/IReminderItem';
import {ILocationStamp, LocationService} from '../../services/location.service';
import {StorageServiceSaveKey} from '../../services/storage.service';
import {IAppState} from '../_core/RootState';
import {StorageAction} from './StorageAction';
import {IStoragePayload} from '../interface/IStoragePayload';

@Injectable({
  providedIn: 'root'
})
export class ReminderMiddleware {
  constructor(
    private reminderReducerAction: ReminderAction,
    private storageAction: StorageAction) {
    //
  }

  reminderAddActionRequest = (store) => (next) => (action: IReminderReducerAction) => {
    if (action.type === ReminderActionType.ReminderAddActionRequest) {
      var getState: IAppState = store.getState();
      /**
       * test payload contents
       */
      if (!action.payload.description || action.payload.description.trim().length === 0) {
        /**
         * error: empty
         */
        store.dispatch(this.reminderReducerAction.reminderAddActionErrorEmpty({
          description: 'Empty!'
        }))
      } else if (!!getState.reminder.reminders.find((item) => item.description === action.payload.description)) {
        /**
         * error: duplicate
         */
        store.dispatch(this.reminderReducerAction.reminderAddActionErrorDuplicate({
          description: 'Duplicate!'
        }))
      } else {
        /**
         * success
         */
        store.dispatch(this.reminderReducerAction.reminderAddActionSuccess({
          description: action.payload.description,
          latitude: 0,
          longitude: 0,
          timestamp: new Date().getTime(),
          completed: false,
          deleted: false,
        } as IReminderItem))
      }
    }
    next(action);
  };

  reminderAddActionSuccess = (store) => (next) => (action: IReminderReducerAction) => {
    if (action.type === ReminderActionType.ReminderAddActionSuccess) {
      var getState: IAppState = store.getState();
      store.dispatch(this.reminderReducerAction.reminderAddActionAddLocRequest(action.payload as IReminderItem));
    }
    next(action);
  };

  reminderAddActionAddLocRequest = (store) => (next) => (action: IReminderReducerAction) => {
    if (action.type === ReminderActionType.ReminderAddActionAddLocRequest) {
      LocationService.getLocation().subscribe(
        (position: ILocationStamp) => {
          action.payload.latitude = position.latitude;
          action.payload.longitude = position.longitude;
          store.dispatch(this.reminderReducerAction.reminderAddActionAddLocSuccess(action.payload as IReminderItem));
        },
        (err) => {
          console.error('Error Getting Location: ', err);
        }
      )
    }
    next(action);
  };

  reminderAddActionAddLocSuccess = (store) => (next) => (action: IReminderReducerAction) => {
    if (action.type === ReminderActionType.ReminderAddActionAddLocSuccess) {
      var getState: IAppState = store.getState();
      store.dispatch(this.storageAction.storageSaveRequest({
        key: StorageServiceSaveKey.ReminderItems,
        data: getState.reminder
      } as IStoragePayload));
    }
    next(action);
  };

  reminderRemoveActionRequest = (store) => (next) => (action: IReminderReducerAction) => {
    if (action.type === ReminderActionType.ReminderRemoveActionRequest) {
      next(action);
      store.dispatch(this.reminderReducerAction.reminderRemoveActionSuccess(null));
    } else {
      next(action);
    }
  };

  reminderRemoveActionSuccess = (store) => (next) => (action: IReminderReducerAction) => {
    if (action.type === ReminderActionType.ReminderRemoveActionSuccess) {
      var getState: IAppState = store.getState();
      store.dispatch(this.storageAction.storageSaveRequest({
        key: StorageServiceSaveKey.ReminderItems,
        data: getState.reminder
      } as IStoragePayload));
    }
    next(action);
  };

  reminderCompleteActionRequest = (store) => (next) => (action: IReminderReducerAction) => {
    if (action.type === ReminderActionType.ReminderRemoveActionRequest) {
      next(action);
      store.dispatch(this.reminderReducerAction.reminderCompleteActionSuccess(null));
    } else {
      next(action);
    }
  };

  reminderCompleteActionSuccess = (store) => (next) => (action: IReminderReducerAction) => {
    if (action.type === ReminderActionType.ReminderRemoveActionSuccess) {
      var getState: IAppState = store.getState();
      store.dispatch(this.storageAction.storageSaveRequest({
        key: StorageServiceSaveKey.ReminderItems,
        data: getState.reminder
      } as IStoragePayload));
    }
    next(action);
  };

  middleware(): Array<Function> {
    console.log('ReminderMiddleware', this);
    return [
      this.reminderAddActionAddLocRequest,
      this.reminderAddActionAddLocSuccess,
      this.reminderAddActionRequest,
      this.reminderAddActionSuccess,
      this.reminderCompleteActionRequest,
      this.reminderCompleteActionSuccess,
      this.reminderRemoveActionRequest,
      this.reminderRemoveActionSuccess,
    ]
  }

}
