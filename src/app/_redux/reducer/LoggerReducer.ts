import {IProximityReducerAction, ProximityReducerActionType} from './ProximityAction';

export interface ILoggerState {
  logs: Array<string>;
}

export const initialProximityState: ILoggerState = {
  logs: []
};

export const LoggerReducer = (
  state = initialProximityState,
  action: IProximityReducerAction
): ILoggerState => {
  state.logs.unshift([state.logs.length, action.type].join('-'));
  return state;
};
