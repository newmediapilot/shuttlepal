export interface IReminderItem {
  description: string;
  timestamp: number;
  latitude: number;
  longitude: number;
  deleted: boolean;
  completed: boolean;
}
