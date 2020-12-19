import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailProductInCartPage } from './detail-product-in-cart';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DetailProductInCartPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailProductInCartPage),
    TranslateModule
  ],
})
export class DetailProductInCartPageModule {}
