import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailOrdersPage } from './detail-orders';

@NgModule({
  declarations: [
    DetailOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailOrdersPage),
  ],
})
export class DetailOrdersPageModule {}
