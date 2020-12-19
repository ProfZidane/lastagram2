import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyNotifPage } from './my-notif';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MyNotifPage,
  ],
  imports: [
    IonicPageModule.forChild(MyNotifPage),
    TranslateModule
  ],
})
export class MyNotifPageModule {}
