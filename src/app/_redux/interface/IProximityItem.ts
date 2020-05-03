export interface IProximityItem {
  description: string;
  timestamp: number;
  latitude: number;
  longitude: number;
  deleted: boolean;
  completed: boolean;
  distance: number;
  perimeter: boolean;
}
