import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailProductPage } from './detail-product';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DetailProductPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailProductPage),
    TranslateModule
  ],
})
export class DetailProductPageModule {}
