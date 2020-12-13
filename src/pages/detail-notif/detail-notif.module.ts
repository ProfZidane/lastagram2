import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailNotifPage } from './detail-notif';

@NgModule({
  declarations: [
    DetailNotifPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailNotifPage),
  ],
})
export class DetailNotifPageModule {}
