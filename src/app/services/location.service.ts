import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IReminderItem} from '../_redux/interface/IReminderItem';
import {IReminderError} from '../_redux/interface/IReminderError';

export interface ILocationStamp {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() {
  }

  /**
   * fetch geolocation data
   */
  static getLocation(): Observable<ILocationStamp> {
    return new Observable((observer) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          observer.next(position.coords);
        }, function (err) {
          observer.error({
            description: 'Error fetching current position',
            error: err
          });
        }, {enableHighAccuracy: true});
      } else {
        observer.error({
          description: 'Geolocation not found in navigator',
          error: null
        });
      }
    });
  }
}
