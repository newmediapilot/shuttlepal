import {IReminderItem} from '../interface/IReminderItem';
import {IReminderReducerAction, ReminderActionType} from './ReminderReducerAction';

export interface IReminderState {
  reminders: Array<IReminderItem>;
}

export const initialReminderState: IReminderState = {
  reminders: []
};

export const ReminderReducer = (
  state = initialReminderState,
  action: IReminderReducerAction
): IReminderState => {
  switch (action.type) {
    case ReminderActionType.ReminderAddAction: {
      return state;
    }
  }
  return state;
};
