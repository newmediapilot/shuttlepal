import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [{
  path: 'v1',
  loadChildren: () => import('./app-feature/app-feature.module').then(m => m.AppFeatureModule)
},
  {path: '', redirectTo: 'v1', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
