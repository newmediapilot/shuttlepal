import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [{
  path: '',
  loadChildren: () => import('./app-feature/app-feature.module').then(m => m.AppFeatureModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
