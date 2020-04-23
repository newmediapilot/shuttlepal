import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { TextareaComponent } from './textarea/textarea.component';
import { MapComponent } from './map/map.component';



@NgModule({
  declarations: [ButtonComponent, TextareaComponent, MapComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
