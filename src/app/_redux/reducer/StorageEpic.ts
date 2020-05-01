import {StorageActionType} from './StorageAction';
import {ofType} from 'redux-observable';
import {map, mapTo} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageEpic {
  constructor() {
  }

  storageSaveRequest = action$ => {
    console.log('is this workign...');
    return action$.pipe(
      ofType(StorageActionType.StorageSaveRequest),
      map((payload) => {
        console.log('storageSaveRequest');
      }),
      mapTo({type: 'helloooooooooooooooooooooooooo'})
    );
  }
}
