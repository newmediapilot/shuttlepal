import {Action} from 'redux';
import {Injectable} from '@angular/core';

export interface IProximityReducerAction extends Action {
  type: string;
  payload: any
}

export enum ProximityReducerActionType {
  ProximityRequestUpdate = '[ProximityAction] ProximityRequestUpdate',
  ProximityRequestUpdateSuccess = '[ProximityAction] ProximityRequestUpdateSuccess',
  ProximityRequestUpdateError = '[ProximityAction] ProximityRequestUpdateError',
  ProximityActivateWatchPosition = '[ProximityAction] ProximityActivateWatchPosition',
  ProximityDeActivateWatchPosition = '[ProximityAction] ProximityDeActivateWatchPosition',
  ProximityRemoveActionRequest = '[ProximityAction] ProximityRemoveActionRequest',
}

@Injectable({providedIn: 'root'})
export class ProximityAction {

  /**
   * enable location watcher
   * @param payload
   */
  proximityActivateWatchPosition(payload: any): IProximityReducerAction {
    return {
      type: ProximityReducerActionType.ProximityActivateWatchPosition,
      payload: payload
    }
  }

  /**
   * remove location watcher
   * @param payload
   */
  proximityDeActivateWatchPosition(payload: any): IProximityReducerAction {
    return {
      type: ProximityReducerActionType.ProximityDeActivateWatchPosition,
      payload: payload
    }
  }

  /**
   * request list based on proximity from location
   * @param payload
   */
  proximityRequestUpdate(payload: any): IProximityReducerAction {
    return {
      type: ProximityReducerActionType.ProximityRequestUpdate,
      payload: payload
    }
  }

  /**
   * request list based on proximity from location failed
   * @param payload
   */
  proximityRequestUpdateSuccess(payload: any): IProximityReducerAction {
    return {
      type: ProximityReducerActionType.ProximityRequestUpdateSuccess,
      payload: payload
    }
  }

  /**
   * request list based on proximity from location success
   * @param payload
   */
  proximityRequestUpdateError(payload: any): IProximityReducerAction {
    return {
      type: ProximityReducerActionType.ProximityRequestUpdateError,
      payload: payload
    }
  }

  proximityRemoveActionRequest(payload: any): IProximityReducerAction {
    return {
      type: ProximityReducerActionType.ProximityRemoveActionRequest,
      payload: payload
    }
  }
}
