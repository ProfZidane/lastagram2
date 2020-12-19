import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddProductSpecialPage } from './add-product-special';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddProductSpecialPage,
  ],
  imports: [
    IonicPageModule.forChild(AddProductSpecialPage),
    TranslateModule
  ],
})
export class AddProductSpecialPageModule {}
