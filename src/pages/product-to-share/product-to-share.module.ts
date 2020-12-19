import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductToSharePage } from './product-to-share';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductToSharePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductToSharePage),
    TranslateModule
  ],
})
export class ProductToSharePageModule {}
