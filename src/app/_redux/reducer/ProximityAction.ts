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
}

@Injectable({providedIn: 'root'})
export class ProximityAction {

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
}
