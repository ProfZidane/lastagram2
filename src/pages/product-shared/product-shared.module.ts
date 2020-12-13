import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductSharedPage } from './product-shared';

@NgModule({
  declarations: [
    ProductSharedPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductSharedPage),
  ],
})
export class ProductSharedPageModule {}
