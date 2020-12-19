import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageMenuPage } from './message-menu';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MessageMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageMenuPage),
    TranslateModule
  ],
})
export class MessageMenuPageModule {}
