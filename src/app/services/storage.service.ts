import {Injectable} from '@angular/core';

export enum StorageServiceSaveKey {
  ReminderItems = 'ReminderItems',
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {

  }

  static saveLocalStore(type: string, payload: any): boolean {
    if (!!localStorage) {
      localStorage.setItem(type, payload);
      return true;
    } else {
      return false;
    }
  }

  static canLocalStore() {
    return !!localStorage;
  }

  static fetchLocalStore(type: string): string {
    return localStorage.getItem(type);
  }
}
