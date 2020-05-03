import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {GeoPosition} from 'geo-position.ts';

export interface ILocationStamp {
  latitude: number;
  longitude: number;
}

export interface IDistanceStamp {
  distance: number
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() {
  }

  /**
   * fetch geolocation data from browser
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

  /**
   * calculates non-denominational distance between two points on a map
   * @param location1
   * @param location2
   */
  static calculateDistanceFromLocation({location1, location2}: { location1: ILocationStamp, location2: ILocationStamp }): IDistanceStamp {

    let xPoint = new GeoPosition(location1.latitude, location1.longitude);
    let yPoint = new GeoPosition(location1.longitude, location1.longitude);

    return {
      distance: xPoint.Distance(yPoint)
    }
  }

  /**
   * calculate if we are within a distance value
   * @param location1
   * @param location2
   * @param distanceValue
   */
  static testRadiusPerimeterEntered({location1, location2, distanceValue}: { location1: ILocationStamp, location2: ILocationStamp, distanceValue: number }): boolean {
    return distanceValue <= this.calculateDistanceFromLocation({location1, location2}).distance;
  }
}
