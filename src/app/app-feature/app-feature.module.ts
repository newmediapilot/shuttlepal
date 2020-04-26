import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppFeatureRoutingModule} from './app-feature-routing.module';
import {AppFeatureComponent} from './app-feature.component';
import {ReminderItemRenderComponent} from './reminder-item-render/reminder-item-render.component';
import {ReminderItemCreateComponent} from './reminder-item-create/reminder-item-create.component';
import {ReminderItemListComponent} from './reminder-item-list/reminder-item-list.component';


@NgModule({
  declarations: [AppFeatureComponent, ReminderItemRenderComponent, ReminderItemCreateComponent, ReminderItemListComponent],
  imports: [
    CommonModule,
    AppFeatureRoutingModule
  ],
  exports: [AppFeatureComponent, ReminderItemRenderComponent, ReminderItemCreateComponent, ReminderItemListComponent]
})
export class AppFeatureModule {
}
