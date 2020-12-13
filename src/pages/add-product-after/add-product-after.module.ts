import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddProductAfterPage } from './add-product-after';

@NgModule({
  declarations: [
    AddProductAfterPage,
  ],
  imports: [
    IonicPageModule.forChild(AddProductAfterPage),
  ],
})
export class AddProductAfterPageModule {}
