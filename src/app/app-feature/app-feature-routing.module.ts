import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppFeatureComponent} from './app-feature.component';
import {ReminderItemCreateComponent} from './reminder-item-create/reminder-item-create.component';
import {ReminderItemListComponent} from './reminder-item-list/reminder-item-list.component';
import {ReminderItemListProximityComponent} from './reminder-item-list-proximity/reminder-item-list-proximity.component';
import {ReminderItemListCompletedComponent} from './reminder-item-list-completed/reminder-item-list-completed.component';
import {ReminderItemListDeletedComponent} from './reminder-item-list-deleted/reminder-item-list-deleted.component';

const routes: Routes = [
  {
    path: '', component: AppFeatureComponent, children: [
      {path: 'create', component: ReminderItemCreateComponent},
      {path: 'list', component: ReminderItemListComponent},
      {path: 'completed', component: ReminderItemListCompletedComponent},
      {path: 'deleted', component: ReminderItemListDeletedComponent},
      {path: 'proximity', component: ReminderItemListProximityComponent},
      {path: '**', redirectTo: 'list', pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppFeatureRoutingModule {
}
