import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageMenuPage } from './message-menu';

@NgModule({
  declarations: [
    MessageMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageMenuPage),
  ],
})
export class MessageMenuPageModule {}
