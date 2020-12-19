import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailNotifPage } from './detail-notif';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DetailNotifPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailNotifPage),
    TranslateModule
  ],
})
export class DetailNotifPageModule {}
