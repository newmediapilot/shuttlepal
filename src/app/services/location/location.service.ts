import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() {
  }

  static getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
      });
    } else {
      //
    }
  }


}
