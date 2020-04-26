import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppFeatureComponent} from './app-feature.component';
import {ReminderItemCreateComponent} from './reminder-item-create/reminder-item-create.component';
import {ReminderItemListComponent} from './reminder-item-list/reminder-item-list.component';

const routes: Routes = [
  {
    path: '', component: AppFeatureComponent, children: [
      {path: 'create', component: ReminderItemCreateComponent},
      {path: 'list', component: ReminderItemListComponent},
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
