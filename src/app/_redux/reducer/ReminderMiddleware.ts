import {IReminderReducerAction, ReminderActionType, ReminderAction} from './ReminderAction';
import {Injectable} from '@angular/core';
import {IReminderItem} from '../interface/IReminderItem';
import {IReminderError, ReminderError} from '../interface/IReminderError';
import {ILocationStamp, LocationService} from '../../services/location.service';
import {StorageServiceSaveKey, StorageService} from '../../services/storage.service';
import {IAppState} from '../_core/RootState';
import {Observable} from 'rxjs';
import {timeout} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReminderMiddleware {
  constructor(
    private reminderReducerAction: ReminderAction) {
    //
  }

  reminderStorageGetRequest = (store) => (next) => (action: IReminderReducerAction) => {
    if (action.type === ReminderActionType.ReminderStorageGetRequest) {
      StorageService.fetchLocalStore(StorageServiceSaveKey.ReminderItems).subscribe(
        (storage: string) => {
          let reminders: Array<IReminderItem> = JSON.parse(storage);
          if (!reminders) {
            reminders = [];
          }
          store.dispatch(this.reminderReducerAction.reminderStorageGetSuccess(reminders))
        },
        (e) => {
          store.dispatch(this.reminderReducerAction.reminderStorageGetError(e))
        }
      );
    }
    next(action);
  };

  reminderStorageGetError = (store) => (next) => (action: IReminderReducerAction) => {
    if (action.type === ReminderActionType.ReminderStorageGetError) {
      console.error('Error Fetching Storage');
    }
    next(action);
  };

  reminderStorageSaveRequest = (store) => (next) => (action: IReminderReducerAction) => {
    if (action.type === ReminderActionType.ReminderStorageSaveRequest) {
      var getState: IAppState = store.getState();
      StorageService.saveLocalStore(StorageServiceSaveKey.ReminderItems, JSON.stringify(getState.reminder.reminders)).subscribe(
        () => {
          store.dispatch(this.reminderReducerAction.reminderStorageSaveSuccess(null));
        },
        (e) => {
          store.dispatch(this.reminderReducerAction.reminderStorageSaveError(e));
        }
      );
    }
    next(action);
  };

  reminderStorageSaveError = (store) => (next) => (action: IReminderReducerAction) => {
    if (action.type === ReminderActionType.ReminderStorageSaveError) {
      var getState: IAppState = store.getState();
      console.error('Error Saving Storage');
    }
    next(action);
  };

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
          description: ReminderError.ReminderItemErrorEmpty,
          meta: null
        } as IReminderError))
      } else if (!!getState.reminder.reminders.find((item) => item.description === action.payload.description)) {
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
    if (action.type === ReminderActionType.ReminderAddActionSuccess) {
      var getState: IAppState = store.getState();
      store.dispatch(this.reminderReducerAction.reminderAddActionAddLocRequest(action.payload as IReminderItem));
    }
    next(action);
  };

  reminderAddActionAddLocRequest = (store) => (next) => (action: IReminderReducerAction) => {
    if (action.type === ReminderActionType.ReminderAddActionAddLocRequest) {
      var getState: IAppState = store.getState();
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
      store.dispatch(this.reminderReducerAction.reminderStorageSaveRequest(null));
    }
    next(action);
  };

  reminderRemoveActionRequest = (store) => (next) => (action: IReminderReducerAction) => {
    if (action.type === ReminderActionType.ReminderRemoveActionRequest) {
      setTimeout(() => {
        store.dispatch(this.reminderReducerAction.reminderRemoveActionSuccess(null));
      })
    }
    next(action);
  };

  reminderRemoveActionSuccess = (store) => (next) => (action: IReminderReducerAction) => {
    if (action.type === ReminderActionType.ReminderRemoveActionSuccess) {
      store.dispatch(this.reminderReducerAction.reminderStorageSaveRequest(null));
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
      this.reminderRemoveActionRequest,
      this.reminderRemoveActionSuccess,
      this.reminderStorageGetError,
      this.reminderStorageGetRequest,
      this.reminderStorageSaveError,
      this.reminderStorageSaveRequest,
    ]
  }

}
