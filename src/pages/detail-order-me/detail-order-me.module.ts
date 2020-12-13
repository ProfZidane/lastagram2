import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailOrderMePage } from './detail-order-me';

@NgModule({
  declarations: [
    DetailOrderMePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailOrderMePage),
  ],
})
export class DetailOrderMePageModule {}
