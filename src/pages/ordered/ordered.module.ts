import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderedPage } from './ordered';

@NgModule({
  declarations: [
    OrderedPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderedPage),
  ],
})
export class OrderedPageModule {}
