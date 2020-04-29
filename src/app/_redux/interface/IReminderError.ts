export enum ReminderError {
  ReminderItemErrorEmpty = 'ReminderItemErrorEmpty',
  ReminderItemErrorDuplicate = 'ReminderItemErrorDuplicate'
}

export interface IReminderError {
  description: string;
  meta: any
}
