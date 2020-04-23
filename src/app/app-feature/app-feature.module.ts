import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppFeatureRoutingModule} from './app-feature-routing.module';
import {AppFeatureComponent} from './app-feature.component';


@NgModule({
  declarations: [AppFeatureComponent],
  imports: [
    CommonModule,
    AppFeatureRoutingModule
  ]
})
export class AppFeatureModule {
}
