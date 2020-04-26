import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppFeatureComponent} from './app-feature.component';

const routes: Routes = [
  {path: '', component: AppFeatureComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppFeatureRoutingModule {
}
