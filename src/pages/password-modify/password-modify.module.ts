import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordModifyPage } from './password-modify';

@NgModule({
  declarations: [
    PasswordModifyPage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordModifyPage),
  ],
})
export class PasswordModifyPageModule {}

