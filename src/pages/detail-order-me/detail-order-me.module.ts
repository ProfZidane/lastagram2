import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailOrderMePage } from './detail-order-me';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DetailOrderMePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailOrderMePage),
    TranslateModule
  ],
})
export class DetailOrderMePageModule {}
