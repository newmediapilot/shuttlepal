import {IReminderItem} from '../interface/IReminderItem';

export interface IReminderState {
  reminders: Array<IReminderItem>;
}

export const initialReminderState: IReminderState = {
  reminders: []
};

export enum ReminderAction {
  ReminderAddAction = 'ReminderAddAction',
  ReminderRemoveAction = 'ReminderRemoveAction',
}

export const ReminderReducer = (
  state = initialReminderState,
  action: ReminderAction
): IReminderState => {
  switch (action) {
    case ReminderAction.ReminderAddAction: {
      // ReminderAction.ReminderAddAction
      return state;
    }
    case ReminderAction.ReminderRemoveAction: {
      // ReminderAction.ReminderRemoveAction
      return state;
    }
  }
  return state;
};
