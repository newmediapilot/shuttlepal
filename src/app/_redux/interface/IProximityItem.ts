import {IReminderItem} from './IReminderItem';

export interface IProximityItem extends IReminderItem{
  proximity_distance: number;
  proximity_timestamp: number;
  proximity_entered: boolean;
}
