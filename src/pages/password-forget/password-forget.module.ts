import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordForgetPage } from './password-forget';

@NgModule({
  declarations: [
    PasswordForgetPage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordForgetPage),
  ],
})
export class PasswordForgetPageModule {}
