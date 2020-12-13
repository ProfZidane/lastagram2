import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterCodeVerificationPage } from './register-code-verification';

@NgModule({
  declarations: [
    RegisterCodeVerificationPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterCodeVerificationPage),
  ],
})
export class RegisterCodeVerificationPageModule {}
