import {IReminderItem} from './IReminderItem';

export interface IProximityItem {
  id: string,
  distance: number;
  perimeter: number,
  entered: boolean;
  reminder: IReminderItem;
}
