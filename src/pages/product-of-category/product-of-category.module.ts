import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductOfCategoryPage } from './product-of-category';

@NgModule({
  declarations: [
    ProductOfCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductOfCategoryPage),
  ],
})
export class ProductOfCategoryPageModule {}
