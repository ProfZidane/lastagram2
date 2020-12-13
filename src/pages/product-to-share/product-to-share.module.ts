import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductToSharePage } from './product-to-share';

@NgModule({
  declarations: [
    ProductToSharePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductToSharePage),
  ],
})
export class ProductToSharePageModule {}
