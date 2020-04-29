import {IReminderItem} from './IReminderItem';
import {IReminderError} from './IReminderError';

export interface IReminderItems {
  reminders: Array<IReminderItem>,
  errors: Array<IReminderError>
}
