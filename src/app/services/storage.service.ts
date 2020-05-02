import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';

export enum StorageServiceSaveKey {
  ReminderItems = '[ShuttlePal]ReminderReducerStore',
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {

  }

  static saveLocalStore(type: string, payload: any): Observable<any> {
    console.log('saveLocalStore', type, payload);
    return new Observable((observer) => {
      if (!!localStorage) {
        observer.next(localStorage.setItem(type, JSON.stringify(payload)));
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
        console.log('fetchLocalStore', type, JSON.parse(localStorage.getItem(type)));
        observer.next(JSON.parse(localStorage.getItem(type)));
      } else {
        observer.error({
          description: 'Local storage not found in navigator',
          error: null
        });
      }
    });
  }

}
