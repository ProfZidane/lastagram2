import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageContentPage } from './message-content';

@NgModule({
  declarations: [
    MessageContentPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageContentPage),
  ],
})
export class MessageContentPageModule {}
