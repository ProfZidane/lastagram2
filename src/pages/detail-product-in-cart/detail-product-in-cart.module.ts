import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailProductInCartPage } from './detail-product-in-cart';

@NgModule({
  declarations: [
    DetailProductInCartPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailProductInCartPage),
  ],
})
export class DetailProductInCartPageModule {}
