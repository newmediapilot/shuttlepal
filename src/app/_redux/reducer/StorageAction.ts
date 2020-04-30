import {Action} from 'redux';
import {Injectable} from '@angular/core';
import {IStoragePayload} from '../interface/IStoragePayload';

export interface IStorageAction extends Action {
  type: string;
  payload: IStoragePayload
}

export enum StorageActionType {
  StorageGetRequest = 'StorageGetRequest',
  StorageGetSuccess = 'StorageGetSuccess',
  StorageGetError = 'StorageGetError',
  StorageSaveRequest = 'StorageSaveRequest',
  StorageSaveError = 'StorageSaveError',
  StorageSaveSuccess = 'StorageSaveSuccess',
}

@Injectable({providedIn: 'root'})
export class StorageAction {

  /**
   * request for storage to be fetched from system
   * @param payload
   */
  storageGetRequest(payload: any): IStorageAction {
    return {
      type: StorageActionType.StorageGetRequest,
      payload: payload
    }
  }

  /**
   * storage from system fetched successfully
   * @param payload
   */
  storageGetSuccess(payload: any): IStorageAction {
    return {
      type: StorageActionType.StorageGetSuccess,
      payload: payload
    }
  }

  /**
   * trigger error if store request fails
   * @param payload
   */
  storageGetError(payload: any): IStorageAction {
    return {
      type: StorageActionType.StorageGetError,
      payload: payload
    }
  }

  /**
   * triggered once data is ready to save to save to storage
   * @param payload
   */
  storageSaveRequest(payload: IStoragePayload): IStorageAction {
    return {
      type: StorageActionType.StorageSaveRequest,
      payload: payload
    }
  }

  /**
   * triggered after data is errored while saving to storage
   * @param payload
   */
  storageSaveError(payload: any): IStorageAction {
    return {
      type: StorageActionType.StorageSaveError,
      payload: payload
    }
  }

  /**
   * triggered after data is errored while saving to storage
   * @param payload
   */
  storageSaveSuccess(payload: any): IStorageAction {
    return {
      type: StorageActionType.StorageSaveSuccess,
      payload: payload
    }
  }
}
