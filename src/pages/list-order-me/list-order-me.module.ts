import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListOrderMePage } from './list-order-me';

@NgModule({
  declarations: [
    ListOrderMePage,
  ],
  imports: [
    IonicPageModule.forChild(ListOrderMePage),
  ],
})
export class ListOrderMePageModule {}
