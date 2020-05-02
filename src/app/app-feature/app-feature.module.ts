import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppFeatureRoutingModule} from './app-feature-routing.module';
import {AppFeatureComponent} from './app-feature.component';
import {ReminderItemCreateComponent} from './reminder-item-create/reminder-item-create.component';
import {ReminderItemListComponent} from './reminder-item-list/reminder-item-list.component';
import {FormsModule} from '@angular/forms';
import {ReminderItemListProximityComponent} from './reminder-item-list-proximity/reminder-item-list-proximity.component';


@NgModule({
  declarations: [AppFeatureComponent, ReminderItemCreateComponent, ReminderItemListComponent, ReminderItemListProximityComponent],
  imports: [
    CommonModule,
    FormsModule,
    AppFeatureRoutingModule
  ],
  exports: [AppFeatureComponent, ReminderItemCreateComponent, ReminderItemListComponent]
})
export class AppFeatureModule {
}
