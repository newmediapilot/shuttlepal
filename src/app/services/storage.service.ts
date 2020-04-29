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

  static saveLocalStore(type: string, payload: any) {
    localStorage.setItem(type, payload);
  }

  static fetchLocalStore(type: string): string {
    return localStorage.getItem(type);
  }
}
