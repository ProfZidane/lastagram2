import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductSharedPage } from './product-shared';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductSharedPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductSharedPage),
    TranslateModule
  ],
})
export class ProductSharedPageModule {}
