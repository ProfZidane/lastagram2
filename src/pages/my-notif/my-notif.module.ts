import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyNotifPage } from './my-notif';

@NgModule({
  declarations: [
    MyNotifPage,
  ],
  imports: [
    IonicPageModule.forChild(MyNotifPage),
  ],
})
export class MyNotifPageModule {}
