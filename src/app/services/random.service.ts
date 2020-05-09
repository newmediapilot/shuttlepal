import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  constructor() {
  }

  /**
   * generates random string based on timestamp and letters
   */
  static generateRandomIdentifier(): string {
    var time = new Date().getTime().toString();
    
    return
  }
}
