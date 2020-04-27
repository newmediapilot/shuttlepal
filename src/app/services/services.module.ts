import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ServicesModule {

  constructor() {
  }

  LOCAL_STORAGE_KEY: string = 'shuttlepal.v1.state';

  getLocalStorageState() {
    try {
      const serializedState = localStorage.getItem(this.LOCAL_STORAGE_KEY);
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  }

  setLocalStorageState(state) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', (this.LOCAL_STORAGE_KEY));
    } catch {
      // ignore write errors
    }
  }
}
