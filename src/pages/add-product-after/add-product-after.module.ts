import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddProductAfterPage } from './add-product-after';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddProductAfterPage,
  ],
  imports: [
    IonicPageModule.forChild(AddProductAfterPage),
    TranslateModule
  ],
})
export class AddProductAfterPageModule {}
