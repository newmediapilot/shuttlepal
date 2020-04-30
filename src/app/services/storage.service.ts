import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';

export enum StorageServiceSaveKey {
  ReminderItems = 'ReminderItems',
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {

  }

  static saveLocalStore(type: string, payload: any): Observable<any> {
    return new Observable((observer) => {
      if (!!localStorage) {
        observer.next(localStorage.setItem(type, payload));
      } else {
        observer.error({
          description: 'Local storage not found in navigator',
          error: null
        });
      }
    });
  }

  static fetchLocalStore(type: string): Observable<any> {
    return new Observable((observer) => {
      if (!!localStorage) {
        observer.next(localStorage.getItem(type));
      } else {
        observer.error({
          description: 'Local storage not found in navigator',
          error: null
        });
      }
    });
  }

}
