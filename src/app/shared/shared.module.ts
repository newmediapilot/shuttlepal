import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './button/button.component';
import {TextareaComponent} from './textarea/textarea.component';

@NgModule({
  declarations: [ButtonComponent, TextareaComponent],
  imports: [
    CommonModule
  ],
  exports: [ButtonComponent, TextareaComponent],
})
export class SharedModule {
}
