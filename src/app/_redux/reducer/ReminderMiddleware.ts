import {IReminderReducerAction, ReminderActionType, ReminderAction} from './ReminderAction';
import {Injectable} from '@angular/core';
import {IReminderItem} from '../interface/IReminderItem';
import {ILocationStamp, LocationService} from '../../services/location.service';
import {StorageServiceSaveKey} from '../../services/storage.service';
import {IAppState} from '../_core/RootState';
import {StorageAction} from './StorageAction';
import {IStoragePayload} from '../interface/IStoragePayload';
import {RandomService} from '../../services/random.service';

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

      if (!action.payload.description || action.payload.description.trim().length === 0) {
        store.dispatch(this.reminderReducerAction.reminderAddActionErrorEmpty({
          description: 'Empty!'
        }));
        next(action);
        return;
      }

      if (!!getState.reminder.reminders.find((item) => item.description === action.payload.description)) {
        store.dispatch(this.reminderReducerAction.reminderAddActionErrorDuplicate({
          description: 'Duplicate!'
        }));
        next(action);
        return;
      }

      if (!!action.payload.latitude || !!action.payload.longitude) {
        if (false === LocationService.testIfCoordinatesValid(action.payload)) {
          store.dispatch(this.reminderReducerAction.reminderAddActionInvalidCoord({
            description: 'Location!'
          }));
          next(action);
          return;
        }
      }

      store.dispatch(this.reminderReducerAction.reminderAddActionSuccess({
        id: RandomService.generateRandomIdentifier(),
        description: action.payload.description,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        timestamp: new Date().getTime(),
        completed: false,
        deleted: false,
      } as IReminderItem))
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
          if (!action.payload.latitude && !action.payload.latitude) {
            action.payload.latitude = position.latitude;
            action.payload.longitude = position.longitude;
          }
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

  reminderEradicateActionRequest = (store) => (next) => (action: IReminderReducerAction) => {
    if (action.type === ReminderActionType.ReminderEradicateActionRequest) {
      next(action);
      store.dispatch(this.reminderReducerAction.reminderEradicateActionSuccess(null));
    } else {
      next(action);
    }
  };

  reminderEradicateActionSuccess = (store) => (next) => (action: IReminderReducerAction) => {
    if (action.type === ReminderActionType.ReminderEradicateActionSuccess) {
      var getState: IAppState = store.getState();
      store.dispatch(this.storageAction.storageSaveRequest({
        key: StorageServiceSaveKey.ReminderItems,
        data: getState.reminder
      } as IStoragePayload));
    }
    next(action);
  };

  reminderUnRemoveActionRequest = (store) => (next) => (action: IReminderReducerAction) => {
    if (action.type === ReminderActionType.ReminderUnRemoveActionRequest) {
      next(action);
      store.dispatch(this.reminderReducerAction.reminderUnRemoveActionSuccess(null));
    } else {
      next(action);
    }
  };

  reminderUnRemoveActionSuccess = (store) => (next) => (action: IReminderReducerAction) => {
    if (action.type === ReminderActionType.ReminderUnRemoveActionSuccess) {
      var getState: IAppState = store.getState();
      store.dispatch(this.storageAction.storageSaveRequest({
        key: StorageServiceSaveKey.ReminderItems,
        data: getState.reminder
      } as IStoragePayload));
    }
    next(action);
  };

  reminderCompleteActionRequest = (store) => (next) => (action: IReminderReducerAction) => {
    if (action.type === ReminderActionType.ReminderCompleteActionRequest) {
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

  reminderUnCompleteActionRequest = (store) => (next) => (action: IReminderReducerAction) => {
    if (action.type === ReminderActionType.ReminderUnCompleteActionRequest) {
      next(action);
      store.dispatch(this.reminderReducerAction.reminderUnCompleteActionSuccess(null));
    } else {
      next(action);
    }
  };

  reminderUnCompleteActionSuccess = (store) => (next) => (action: IReminderReducerAction) => {
    if (action.type === ReminderActionType.ReminderUnCompleteActionSuccess) {
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
      this.reminderEradicateActionRequest,
      this.reminderEradicateActionSuccess,
      this.reminderUnCompleteActionRequest,
      this.reminderUnCompleteActionSuccess,
      this.reminderUnRemoveActionRequest,
      this.reminderUnRemoveActionSuccess,
    ]
  }

}
