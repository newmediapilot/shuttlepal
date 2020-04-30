import {IStorageAction, StorageActionType} from './StorageAction';
import {Injectable} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {IAppState} from '../_core/RootState';
import {StorageAction} from './StorageAction';

@Injectable({
  providedIn: 'root'
})
export class StorageMiddleware2 {
  constructor(
    private storageAction: StorageAction
  ) {
    //
  }

  storageGetRequest = (store) => (next) => (action: IStorageAction) => {
    if (action.type === StorageActionType.StorageGetRequest) {
      StorageService.fetchLocalStore(action.payload.key).subscribe(
        (storage: string) => {
          store.dispatch(this.storageAction.storageGetSuccess(storage))
        },
        (e) => {
          store.dispatch(this.storageAction.storageGetError(e))
        }
      );
    }
    next(action);
  };

  storageGetError = (store) => (next) => (action: IStorageAction) => {
    if (action.type === StorageActionType.StorageGetError) {
      console.error('Error Fetching Storage');
    }
    next(action);
  };

  storageSaveRequest = (store) => (next) => (action: IStorageAction) => {
    if (action.type === StorageActionType.StorageSaveRequest) {
      var getState: IAppState = store.getState();
      StorageService.saveLocalStore(
        action.payload.key,
        action.payload.data
      ).subscribe(
        () => {
          store.dispatch(this.storageAction.storageSaveSuccess(null));
        },
        (e) => {
          store.dispatch(this.storageAction.storageSaveError(e));
        }
      );
    }
    next(action);
  };

  storageSaveError = (store) => (next) => (action: IStorageAction) => {
    if (action.type === StorageActionType.StorageSaveError) {
      var getState: IAppState = store.getState();
      console.error('Error Saving Storage');
    }
    next(action);
  };

  middleware(): Array<Function> {
    console.log('StorageMiddleware2', this);
    return [
      this.storageGetError,
      this.storageGetRequest,
      this.storageSaveError,
      this.storageSaveRequest,
    ]
  }

}
