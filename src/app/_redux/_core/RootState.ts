import {initialReminderState, IReminderState} from '../reducer/ReminderReducer';

export interface IAppState {
  reminder: IReminderState;
}

export const AppState = {
  reminder: initialReminderState
};
