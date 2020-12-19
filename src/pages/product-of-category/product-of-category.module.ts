import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductOfCategoryPage } from './product-of-category';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductOfCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductOfCategoryPage),
    TranslateModule
  ],
})
export class ProductOfCategoryPageModule {}
