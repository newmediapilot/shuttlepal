import {IReminderItem} from './IReminderItem';

export interface IProximityItem extends IReminderItem {
  distance: number;
  perimeter: number,
  entered: boolean;
}
