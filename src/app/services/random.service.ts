import {Injectable} from '@angular/core';
import * as createHash from 'hash-generator';

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
    var hash = createHash(40);
    return [hash, time].join('-');
  }
}
